/**
 Thoughts:

 - Do I need to make classes for each reaction to the board game state, or would strings just suffice

 */



/**
 * This function takes in string which should either convey the words no or yes
 * and process them to either be no or yes.
 * @param {String} response: The word that should either be a form of no or yes
 * @returns {String} Either yes, no, or err
 */
function response_processor(response){
    // These are some words that the response need to be compared with:
    const yes_list = ["yes", "y", "ye"]
    const  no_list = ["no", "n"]

    let helper = response.toLowerCase();
    //if response is yes
    if (yes_list.includes(helper)){
        return "yes"
    }
    // if response is no
    else if (no_list.includes(helper)){
        return "no"
    }
    // if response is other, send message of error
    else {
        return "err"
    }
}

/**
 * Dissolves an array of strings and returns the string
 * @param arr{Array} The array of strings
 * @return{String} The dissolved array as a string
 */
function dissolve_string_array(arr){
    // The dissolved array to be returned
    let return_string = "";
    // Loop over the strings to then append to the return string
    for (let i = 0; i< arr.length; i++){
        // This checks if each element in each row are only single characters
        if (arr[i].length > 1){
            return "E";
        }
        else if (arr[i] === "x"){
            return_string += "X";
        }
        else if (arr[i] === "o"){
            return_string += "O";
        }
        else{
            return_string += arr[i];
        }
    }
    if (return_string.length===3){
        return return_string;
    }
    else{
        return "E";
    }

}

/**
 * This function examines a Tic-Tac-Toe board and determines if the game is
 * still in progress or if it has been completed,
 *     and if it has been completed, whether the first player won,
 *     the second player won, or if the game is a draw.
 *
 *     A given board is represented by a 2d array, eg:
 *     [[X,O,X],
 *     [O,O,X],
 *     [X,X,_]]
 * There should be three symbols:
 *     X: representing one player
 *     O: representing another player
 *     _: represents nothing
 * @param {Array} board: a tensor representing a tic-tac-toe game
 * @param {String} player_one: The name of player one
 * @param {String} player_two: The name of player two
 * @param {String} did_player1_play_X: Did player1 play X
 * @return {String}: returns a string to indicate the state of the game
 */
function game_state_checker(board, player_one, player_two,did_player1_play_X ) {
    let choice = response_processor(did_player1_play_X);
    // To indicate which symbol each player was playing as
    let player_dict = {};
    // These lines of code fill the player_dict.
    if (response_processor(choice) === "yes"){
        player_dict["X"] = player_one;
        player_dict["O"] = player_two;
    }
    else if (response_processor(choice) === "no"){
        player_dict["O"] = player_one;
        player_dict["X"] = player_two;
    }
    else{
        // If case where the user responds incorrectly to the
        // 'did_player1_play_X' input, breaks the code
        return "Invalid answer to who player_one was playing as";
    }
    // Now we analyse the board to determine the state.

    // See if X was winner
    if (player_win(board, "X")){
        return player_dict["X"] + " won the game";
    }
    // See if Y was winner
    else if (player_win(board, "O")){
        return player_dict["O"] + " won the game";
    }

    //This function checks if the board is either incomplete or uses unwanted characters
    let invalid_board = check_board(board);

    //Check if game is not finished
    if (invalid_board === "Game not Finished"){
        return "Game not Finished";
    }
    // Check if board uses unexpected characters
    else if(invalid_board === "Invalid Board"){
        return "Invalid Board";
    }
    // In case there is a draw in the game
    else{
        return "Game draw, No winner"
    }
}

/**
 * This function checks if the board is either unfinished or has unexpected characters present in it
 * @param{array} board: a array representation of a tic-tac-toe game
 * @returns {String} returns a message to indicate the state of the board
 */
function check_board(board){
    // Dissolve the board into a string
    let dissolved_board = dissolve_string_array(board[0]) + dissolve_string_array(board[1]) + dissolve_string_array(board[2]);
    // Iterate over string
    for (let i = 0; i<dissolved_board.length; i++){
        // If character is blank, game is unfinished
        if(dissolved_board[i] === "_"){
            return "Game not Finished";
        }
        // If character is not one of the excepted characters, then fail
        else if (dissolved_board[i] !== "X" && dissolved_board[i] !== "O"){
            return "Invalid Board";
        }
    }
    // Case where game has finished, but cannot progress anymore
    return "No Winner";
}

/**
 * This function examines if x or o won the game
 * @param{Array} board: input score
 * @param{String} player: The players character
 * @return{boolean}: Indicates if the player one
 */
function player_win(board, player) {
    // This string to compare results on the board to evaluate if a player has one or not
    let comparer = ""
    while (comparer.length < 3) {
        comparer += player;
    }
    // This function checks if a board has 3 rows, no more and no less
    if (board.length!==3){
        return false;
    }
    //Check if horizontals match
    if (dissolve_string_array(board[0]) === comparer
        || dissolve_string_array(board[1]) === comparer
        || dissolve_string_array(board[2]) === comparer){
    return true;
    }
    //Check if diagonals match
   else if (board[0][0] + board[1][1]+ board[2][2] === comparer
        || board[0][2] + board[1][1]+ board[2][0] === comparer){
    return true;
   }
    // Check if verticals match
   else if (board[0][0] + board[1][0] + board[2][0] === comparer
        || board[0][1] + board[1][1] + board[2][1] === comparer
        || board[0][2] + board[1][2] + board[2][2] === comparer) {
        return true;
   }
    // If all else fails...
    else{
        return false;
    }
}


module.exports.response_processor = response_processor;
module.exports.dissolve_string_array = dissolve_string_array;
module.exports.game_state_checker = game_state_checker;
module.exports.check_board = check_board;
module.exports.player_win = player_win;


// let invalid_board = [["e","_","_"],
//                     ["X","O","_"],
//                      ["O","X","_"]];
// console.log(check_board(invalid_board));
// let board = [["X","X","X"],
//             ["_","_","_"],
//             ["O","O","_"]];
// let player1 =  "John";
// let player2 =  "Dylan";
//
// console.log(game_state_checker(board, player1, player2, "yes"));

let o_board_win_right_vertical = [["X","_","O"],
    ["X","_","O"],
    ["_","_","O"]];

console.log(player_win(o_board_win_right_vertical, "O"));
