import os
import random
from time import sleep

playersCount = int(input("How many players are going to Compete?"))

playerData = list()

totalFrames = 10

def clearScreen():
    if os.name == 'posix':
        clean = os.system('clear')
    else:
        clean = os.system('cls')
        
def showBowling():
    print(" | | | | | ")
    print("  | | | |  ")
    print("     |     ")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("     0     ")
    sleep(1)
    clearScreen()
    print(" | | | | | ")
    print("  | | | |  ")
    print("     |     ")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    print("     0     ")
    sleep(0.5)
    clearScreen()
    print(" | | | | | ")
    print("  | | | |  ")
    print("     |     ")
    print("")
    print("")
    print("")
    print("")
    print("     0     ")
    sleep(0.5)
    clearScreen()
    print(" | | | | | ")
    print("  | | | |  ")
    print("     |     ")
    print("     0     ")
    sleep(0.5)
    
    
def getScore():
    showBowling()
    clearScreen()
    score = random.randint(0,10)
    print("your score for this bowl", score)
    if score == 10:
        print("It's a Strike, 2 more bowls left...")
        score = score + getScoreforNextBowls(2)
    elif score == 0:
        print("Foul!..., 1 more bowl left...")
        score = score + getScoreforNextBowls(1)
    else:
        print("1 More bowl left to get atleast Spare")
        score = score + getScoreforNextBowls(1, 10-score)
        if score == 10:
            print("It's a Spare..., one more bowl left")
            score = score + getScoreforNextBowls(1)
    return score
        
def getScoreforNextBowls(bowls, withrange = 10):
    score = 0
    while bowls > 0:
        s = input("Please enter key to bowl")
        score = score + random.randint(0,withrange)
        print("you score for this bowl", score)
        if score == 10:
            print("Wow..It's a Strike")
        elif score == 0:
            print("Foul...")
        else:
            print("well bowled")
        bowls = bowls -1
    print("Please wait...")
    sleep(2)
    return score

def showRoundResults(roundnum):
    print("------------------------------------------------------------------------")
    print("| Name | Rounds | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | Total Score |")
    for i in playerData:
        print("|   "+i['name']+"   | Score  | "+str(i['frame1score'])+"  | "+str(i['frame2score'])+"  | "+str(i['frame3score'])+"  | "+str(i['frame4score'])+"  | "+str(i['frame5score'])+"  | "+str(i['frame6score'])+"  | "+str(i['frame7score'])+"  | "+str(i['frame8score'])+"  | "+str(i['frame9score'])+"  | "+str(i['frame10score'])+"   |     "+str(i['totalScore'])+"        |")
    print("------------------------------------------------------------------------")

def showFinalResult():
    print("------------------------------------------------------------------------")
    print("| Name | Rounds | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | Total Score |")
    for i in playerData:
        print("|   "+i['name']+"   | Score  | "+str(i['frame1score'])+"  | "+str(i['frame2score'])+"  | "+str(i['frame3score'])+"  | "+str(i['frame4score'])+"  | "+str(i['frame5score'])+"  | "+str(i['frame6score'])+"  | "+str(i['frame7score'])+"  | "+str(i['frame8score'])+"  | "+str(i['frame9score'])+"  | "+str(i['frame10score'])+"   |     "+str(i['totalScore'])+"        |")
    print("------------------------------------------------------------------------")
    winner = ''
    highestScore = 0
    for player in playerData:
        if player['totalScore'] > highestScore:
            highestScore = player['totalScore']
            winner = player['name']
    print("")
    print(winner + " Won the Match..")
    
### Game logic starts here
for i in range (0,playersCount):
    count = str(i+1)
    playerName = input("Enter Player"+count+ "Name")
    clearScreen()
    playerData.append({'name': playerName, 'frame1score': 'NA', 'frame2score': 'NA', 'frame3score': 'NA',
    'frame4score': 'NA', 'frame5score': 'NA', 'frame6score': 'NA', 'frame7score': 'NA', 'frame8score': 'NA',
    'frame9score': 'NA', 'frame10score': 'NA',
    'totalScore': 0})
    
print('Starting the Game...')
sleep(5)
clearScreen()

for i in range (0, totalFrames):
    for j in range (0, playersCount):
        print("Round "+str(i+1))
        name = playerData[j]['name']
        bowl = input(name+ "'s turn please enter key to bowl")
        score = getScore()
        frameName = 'frame'+str(i+1)+'score'
        playerData[j][frameName] = score
        playerData[j]['totalScore'] = playerData[j]['totalScore'] + score 
        clearScreen()
    print("Showing Round "+str(i+1)+"result:")
    showRoundResults(str(i+1))
    s = input("Press Enter to continue with the Game...")
    clearScreen()
showFinalResult()
    