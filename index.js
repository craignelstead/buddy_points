// js index. Imports go Here.

//Get data using sleeper api
//https://docs.sleeper.com/#introduction
const sleeperData = (function() {

    async function getData (info) {
        try {
            const leagueID = '1048312679192006656';
            const apiCall = `https://api.sleeper.app/v1/league/${leagueID}${info}`;
            const response = await fetch(apiCall, {mode: 'cors'});
            const data = await response.json();

            //console.log(data);

            return data;
        } catch(Error) {
            //Handle that error
        } //finally {}
    }

    async function getMatchups () {
        const matchups = await getData('/matchups/5');

        return matchups;
    }

    async function getUsers () {
        const users = await getData('/users');

        return users;
    }

    return {
        getData,
        getMatchups,
        getUsers,
    }
})();

const arrangeData = (function() {

    //Take sleeper data to create objects for each user
    async function createArrayOfDisplaynames () {
        const rawUserData = await sleeperData.getUsers();
        const rawMatchData = await sleeperData.getMatchups();
        const userList = [];

        // console.log(rawUserData);
        // console.log(rawMatchData);

        //Assign each user their buddy, score, and buddy score
        for (let i = 0; i < rawUserData.length; i++) {
            //Manually assign user's buddy & rosterID
            let buddy;
            let rosterID;
            let userScore;
            let buddyScore;
            switch(rawUserData[i].user_id) {
                //speshalke - BWright76
                case '84469865557409792':
                    buddy = 'BWright76';
                    rosterID = 2;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[9].points;
                    break;
                //BWright76 - craigadocious
                case '342411159837720576':
                    buddy = 'craigadocious';
                    rosterID = 10;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[0].points;
                    break;
                //craigadocious - TBD
                case '558434559658229760':
                    buddy = 'Stallion85';
                    rosterID = 1;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[4].points;
                    break;
                //ashin0394 - TBD
                case '588097347360169984':
                    buddy = 'Mitchell995';
                    rosterID = 3;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[10].points;
                    break;
                //joemartin739 - nbarta
                case '715310991595864064':
                    buddy = 'nbarta';
                    rosterID = 8;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[3].points;
                    break;
                //Stallion85 - Darkorus
                case '735352334758035456':
                    buddy = 'Darkorus';
                    rosterID = 5;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[8].points;
                    break;
                //Altoidman - ashin0394
                case '767805903692025856':
                    buddy = 'ashin0394';
                    rosterID = 6;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[2].points;
                    break;
                //Darkorus - Altoidman
                case '795480054070108160':
                    buddy = 'Altoidman';
                    rosterID = 9;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[5].points;
                    break;
                //BombSquad15 - joemartin739
                case '825141419747414016':
                    buddy = 'joemartin739';
                    rosterID = 7;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[7].points;
                    break;
                //ShinyHunter32 - speshalke
                case '825199774494986240':
                    buddy = 'speshalke';
                    rosterID = 12;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[1].points;
                    break;
                //nbarta - BombSquad15
                case '847716642564722688':
                    buddy = 'BombSquad15';
                    rosterID = 4;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[6].points;
                    break;
                //Mitchell995 - ShinyHunter32
                case '847945642402783232':
                    buddy = 'ShinyHunter32';
                    rosterID = 11;
                    userScore = rawMatchData[rosterID - 1].points;
                    buddyScore = rawMatchData[11].points;
                    break;
            }

                const newUser = user(
                    rawUserData[i].display_name, //displayName
                    rawUserData[i].user_id, //userID
                    rosterID, //rosterID
                    buddy, //buddyName
                    userScore, //userScore
                    buddyScore //buddyScore
                );

            userList.push(newUser);
        }

        const sortedUsers = sortUsers(userList);

        updateDOM.displayAllUsers(sortedUsers);

        return sortedUsers
    }

    //Sort the users based on their combined scores
    function sortUsers (users) {
        return users.sort((a, b) => b.combinedScore - a.combinedScore);
    }

    return {
        createArrayOfDisplaynames,
    }

})();

//Get users, scores when page loads
const initializer = (function() {
    async function getUsers () {
        try {
            const users = arrangeData.createArrayOfDisplaynames();

            console.log(users);
        } catch(Error) {
            //Handle that error
        } //finally {}
    }

    return {
        getUsers
    }
})();

//Create user objects
const user = (
    displayName,
    userID,
    rosterID,
    buddyName,
    userScore,
    buddyScore,
    combinedScore,
    ) => {
    displayName = displayName;
    userID = userID;
    rosterID = rosterID;
    buddyName = buddyName;
    userScore = Math.round(userScore * 100) / 100;
    buddyScore = Math.round(buddyScore * 100) / 100;
    combinedScore = Math.round(userScore * 100) / 100 + Math.round(buddyScore * 100) / 100;

    return {
        displayName,
        userID,
        rosterID,
        buddyName,
        userScore,
        buddyScore,
        combinedScore,
    }
}

//Update DOM
const updateDOM = (function(doc) {

    function displayAllUsers (allUsers) {
        console.log('All users:');
        console.log(allUsers);

        const cardHolder = doc.getElementById('cardHolder');
        let rank = 1;

        allUsers.forEach(user => {
            const card = doc.createElement('div');
            card.classList.add('card');
            
            //Top half of card
            const topDiv = doc.createElement('div');
            topDiv.classList.add('top');
            const topDivUser = doc.createElement('span');
            const topDivRank = doc.createElement('span');

            topDivUser.textContent = user.displayName;
            topDivRank.textContent = rank;
            topDivRank.classList.add('rank');

            switch (rank) {
                case 1:
                    topDiv.classList.add('currentWinner');
                    topDivRank.classList.add('gold');
                    break;
                case 2:
                    topDivRank.classList.add('silver');
                    break;
                case 3:
                    topDivRank.classList.add('bronze');
                    break; 
            }

            topDiv.append(topDivUser, topDivRank);

            card.append(topDiv);

            rank++;

            //Bottom half of card
            const bottomDiv = doc.createElement('div');
            bottomDiv.classList.add('bottom');

            const mini1 = doc.createElement('div');
            mini1.classList.add('miniDiv');
                const scoreTitle = doc.createElement('span');
                scoreTitle.textContent = 'Team score:'

                const bottomScore = doc.createElement('span');
                bottomScore.textContent = user.userScore;

                mini1.append(scoreTitle, bottomScore);

            const mini2 = doc.createElement('div');
            mini2.classList.add('miniDiv');
                const buddyTitle = doc.createElement('span');
                buddyTitle.textContent = 'Buddy score:'

                const bottomBuddy = doc.createElement('span');
                bottomBuddy.textContent = `${user.buddyName}: ${user.buddyScore}`;

                mini2.append(buddyTitle, bottomBuddy);

            const bottomComboScore = doc.createElement('span');
            bottomComboScore.textContent = user.combinedScore;
            bottomComboScore.classList.add('comboScore');

            bottomDiv.append(mini1, mini2, bottomComboScore);
            card.append(bottomDiv);

            cardHolder.append(card);  
        });

    }

    return {
        displayAllUsers,
    }

})(document);

initializer.getUsers();