import { number } from "joi";

export class GameScores {
    public frame1: number;
    public frame2: number;
    public frame3: number;
    public frame4: number;
    public frame5: number;
    public frame6: number;
    public frame7: number;
    public frame8: number;
    public frame9: number;
    public frame10: number;
    public totalScore: number;
    public gameDetails: object;

    constructor() {

    }
}

export default GameScores;