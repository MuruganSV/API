import { Request, Response, NextFunction } from "express";
import { IRandomUsersScores, IUserFrameScores } from "../common/models/modal";
import { InstanceClassArray } from "../common/models/instancestore";
import GameScores from "../common/models/datamodal";

const resultFormat = {
    frame1: 0, frame2: 0, frame3: 0, frame4: 0, frame5: 0, frame6: 0, frame7: 0,
    frame8: 0, frame9: 0, frame10: 0, totalScore: 0
};

export class Controller {
    public getRandomScoreforUsers = async (req: Request, res: Response, next: NextFunction) => {
        var id = 'utuGUTygvhjf89798789';
        var instance = new GameScores();
        InstanceClassArray.push({ id: id, instance: instance });
        instance.frame1 = 10;
        const gameRounds: number = 10;
        const users: [] = req.body.names;
        let result: IRandomUsersScores[] = [];
        let promises = [];
        users.forEach(user => {
            promises.push(this.getFrameValues(gameRounds).then((data: IUserFrameScores) => {
                var obj: IRandomUsersScores = { name: user, ...data };
                result.push(obj);
            }));
        });
        await Promise.all(promises).then(async (user) => {
            if (user) {
                res.status(200).send({ result });
            }
        });
    }

    public getRandomScoreforSingleUsers = async (req: Request, res: Response, next: NextFunction) => {
        var instance = InstanceClassArray.find((element) => {
            return element.id === 'utuGUTygvhjf89798789' ? element.instance : null;
        });
        if(instance) {
            console.log(instance.instance.frame1);
        }
        console.log(InstanceClassArray);
        const maxRange: number = +(req.query.max);
        let score: number = Math.floor(Math.random() * maxRange);
        res.status(200).send({ score });
    }

    /**
     * Take the number of frames and return frameScores
     * @param {number} frames
     * @returns frameScores for the number of frames
     */
    public getFrameValues = async (frames: number) => {
        // @ts-ignore
        let frameScore = [];
        let i = 1;
        while (frames > 0) {
            let frameData = {};
            let score: number = this.getScore();
            while (score == 0) {
                score = this.getScore();
            }
            frameData['1'] = score;
            console.log("score for frame ", i, score);
            if (i == 10) {
                if (score == 10) {
                    frameData['type'] = 'strike';
                    frameData['2'] = this.getScore();
                    frameData['3'] = this.getScore();
                } else {
                    let temp: number = this.getScore(11 - score);
                    frameData['2'] = temp;
                    score = score + temp;
                    console.log("score for frame ", i, score);
                    if (score == 10) {
                        frameData['type'] = 'spare';
                        frameData['3'] = this.getScore();
                        console.log("score for frame ", i, frameData['3']);
                    } else {
                        frameData['3'] = 0;
                        console.log("score for frame ", i, frameData['3']);
                        frameData['type'] = 'open';
                    }
                }
            }
            else {
                if (score == 10) {
                    frameData['type'] = 'strike';
                    i += 1;
                } else if (score !== 0 && score < 10) {
                    let temp: number = this.getScore(11 - score);
                    frameData['2'] = temp;
                    score = score + temp;
                    console.log("score for frame ", i, score);
                    if (score == 10) {
                        frameData['type'] = 'spare';
                    } else {
                        frameData['type'] = 'open';
                    }
                    i += 1;
                }
            }
            frameScore.push(frameData);
            frames -= 1;
        }
        let result: IUserFrameScores = await this.calcuateFrameScores(frameScore);
        return result;
    }


    /**
     * Take the range
     * @param {number} range
     * @returns random score in the given range 
     */
    public getScore = (range: number = 11) => {
        return Math.floor(Math.random() * range);
    }

    /**
     * Take the frameScores and calculate the value for each frames
     * @param {any} frameScores
     * @returns framesData by calculating scores for all frames
     */
    public calcuateFrameScores = async (frameScores: any) => {
        let total = 0, framesData: IUserFrameScores = { ...resultFormat, gameDetails: { strike: 0, open: 0, spare: 0 } };
        frameScores.forEach((frames: any, i: number) => {
            if (i + 1 == 10) {
                framesData.gameDetails[frameScores[i]['type']] = framesData.gameDetails[frameScores[i]['type']] + 1;
                total = total + frameScores[i]['1'] + frameScores[i]['2'] +
                    frameScores[i]['3'];
            } else if (i + 1 == 9) {
                if (frames['type'] == 'strike') {
                    framesData.gameDetails['strike'] = framesData.gameDetails['strike'] + 1;
                    total = total + 10 + frameScores[i + 1]['1'] + frameScores[i + 1]['2'];
                } else if (frames['type'] == 'spare') {
                    framesData.gameDetails['spare'] = framesData.gameDetails['spare'] + 1;
                    total = total + 10 + frameScores[i + 1]['1'];
                } else {
                    framesData.gameDetails['open'] = framesData.gameDetails['open'] + 1;
                    total = total + frames['1'] + frames['2'];
                }
            } else {
                if (frames['type'] == 'open') {
                    framesData.gameDetails['open'] = framesData.gameDetails['open'] + 1;
                    total = total + frames['1'] + frames['2'];
                } else if (frames['type'] == 'spare') {
                    framesData.gameDetails['spare'] = framesData.gameDetails['spare'] + 1;
                    total = total + 10 + frameScores[i + 1]['1'];
                } else if (frames['type'] == 'strike') {
                    framesData.gameDetails['strike'] = framesData.gameDetails['strike'] + 1;
                    total = total + 10;
                    if (frameScores[i + 1]['type'] == 'strike') {
                        total = total + 10;
                        if (frameScores[i + 2]['type'] == 'strike') {
                            total = total + 10;
                        } else {
                            total = total + frameScores[i + 2]['1'];
                        }
                    } else {
                        total = total + frameScores[i + 1]['1'] + frameScores[i + 1]['2'];
                    }
                }
            }
            frames['total'] = total;
            framesData['frame' + (i + 1)] = total;
            framesData['totalScore'] = total;
        });
        return framesData;
    }
}

export default new Controller();