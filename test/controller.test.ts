let chai = require('chai');
const expect = chai.expect;

import supertest from 'supertest';
import controller from "../server/api/controller/controller";

const data = [{
    "1": 9,
    "2": 1,
    "type": "spare"
}, {
    "1": 9,
    "2": 0,
    "type": "open"
}, {
    "1": 6,
    "2": 1,
    "type": "open"
}, {
    "1": 4,
    "2": 6,
    "type": "spare"
}, {
    "1": 1,
    "2": 9,
    "type": "spare"
}, {
    "1": 8,
    "2": 1,
    "type": "open"
}, {
    "1": 4,
    "2": 1,
    "type": "open"
}, {
    "1": 5,
    "2": 1,
    "type": "open"
}, {
    "1": 1,
    "2": 2,
    "type": "open"
}, {
    "1": 10,
    "2": 1,
    "3": 10,
    "type": "strike"
}];

const result = {
    "gameDetails": {
        "strike": 1,
        "spare": 3,
        "open": 6
    },
    "frame1": 19,
    "totalScore": 108,
    "frame2": 28,
    "frame3": 35,
    "frame4": 46,
    "frame5": 64,
    "frame6": 73,
    "frame7": 78,
    "frame8": 84,
    "frame9": 87,
    "frame10": 108
};

describe("Test Secanrio 1 - Testing calculateFrames()", () => {
    before(() => {
        console.log("Starting the Test Cases...");
    });

    after(() => {
        console.log("Test cases are executed...");
    });

    it('Should return the data must matches to the mock result', async () => {
        let returnData = await controller.calcuateFrameScores(data);
        expect(returnData.gameDetails.strike == result.gameDetails.strike).to.be.true;
        expect(returnData.gameDetails.spare == result.gameDetails.spare).to.be.true;
        expect(returnData.gameDetails.open == result.gameDetails.open).to.be.true;
    });
});

describe("Test Secanrio 2 - Testing getScore()", () => {
    before(() => {
        console.log("Starting Test Caseses...");
    });

    after(() => {
        console.log("Test cases are Executed!");
    });

    it('Should return score lesser than 11 - getScore()', async () => {
        let result = await controller.getScore();
        // @ts-ignore
        expect(result <= 10).to.be.true;
    });

    it('Should return score lesser than given range 5 - getScore()', async () => {
        let result = await controller.getScore(5);
        // @ts-ignore
        expect(result < 5).to.be.true;
    });
});

describe("Test Scenario 3 - Testing getFrameValues()", () => {
    before(() => {
        console.log("Starting Test Caseses...");
    });

    after(() => {
        console.log("Test cases are Executed!");
    });

    it('should return frameScores{}', async () => {
        let result = await controller.getFrameValues(10);
        expect(result).to.be.ok;
    });
});


describe("Test scenario 4 - '/getscore' POST - Endpoint", () => {
    before(() => {
        console.log("Starting Test Caseses...");
    });

    after(() => {
        console.log("Test cases are Executed!");
    });
    it('should return 200 for Valid request body', (done) => {
        supertest('http://localhost:3000')
            .post('/tenpin/getscore')
            .send({
                names: [
                    'Player1',
                    'Player2'
                ]
            })
            .expect(200)
            .end((err, res) => {
                done();
            });
    });
    it('should return 400 for InValid request body', (done) => {
        supertest('http://localhost:3000')
            .post('/tenpin/getscore')
            .send({
                names: [
                    0,
                    1
                ]
            })
            .expect(400)
            .end((err, res) => {
                done();
            });
    });
});


describe("Test scenario 5 - '/getsingleuserscore' GET - Endpoint", () => {
    before(() => {
        console.log("Starting Test Caseses...");
    });

    after(() => {
        console.log("Test cases are Executed!");
    });
    it('should return 200 for Valid request max range paramater < 12 or negative number', (done) => {
        supertest('http://localhost:3000')
            .get('/tenpin/getsingleuserscore?max=11')
            .expect(200)
            .end((err, res) => {
                done();
            });
    });
    it('should return 400 for InValid request max range parameter > 12 or negative number', (done) => {
        supertest('http://localhost:3000')
            .get('/tenpin/getsingleuserscore?max=-1')
            .expect(400)
            .end((err, res) => {
                done();
            });
    });
});