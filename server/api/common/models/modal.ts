export interface IUserFrameScores {
    frame1: number;
    frame2: number;
    frame3: number;
    frame4: number;
    frame5: number;
    frame6: number;
    frame7: number;
    frame8: number;
    frame9: number;
    frame10: number;
    gameDetails : {
        strike: number;
        open: number;
        spare: number;
    };
    totalScore: number;
}

export interface IRandomUsersScores extends IUserFrameScores {
    name: string;
}