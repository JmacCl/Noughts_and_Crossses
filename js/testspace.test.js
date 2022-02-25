const {response_processor, dissolve_string_array, game_state_checker, check_board, player_win} = require('./change_way_question');

/**
 * Unit tests for response_processor function
 */

test("should input YES and should return yes", () =>{
    expect(response_processor("YES")).toBe("yes");
})

test("should input yes and should return yes", () =>{
    expect(response_processor("yes")).toBe("yes");
})

test("should input NO and should return no", () =>{
    expect(response_processor("NO")).toBe("no");
})

test("should input erpvev and should return err", () =>{
    expect(response_processor("erpvev")).toBe("err");
})

/**
 * Unit tests for dissolve_string_array function
 */

test("Should return successfully and return XO_", () =>{
    let arr = ["x","o","_"]
    expect(dissolve_string_array(arr)).toBe("XO_");
})

test("Should return successfully and return XXO", () =>{
    let arr = ["X","X","O"]
    expect(dissolve_string_array(arr)).toBe("XXO");
})

test("This test should fail as the array is too big", () =>{
    let arr = ["X","X","O","O"]
    expect(dissolve_string_array(arr)).toBe("E");
})

test("This test should fail as the array is too small", () =>{
    let arr = ["X","X"]
    expect(dissolve_string_array(arr)).toBe("E");
})

test("This test should return a E as the strings are too big in the array", () =>{
    let arr = ["ES","ES","GY"]
    expect(dissolve_string_array(arr)).toBe("E");
})


/**
 * Unit tests for check_board function
 */

// Let's test an invalid board

let invalid_board = [["e","_","_"],
                    ["X","O","_"],
                    ["O","X","_"]];

test("should input a board with an incorrect character, and the function should eb able to determine this as much", () =>{
    expect(check_board(invalid_board)).toBe("Invalid Board");
})

// Let's test an empty board

let empty_board = [["_","_","_"],
                    ["_","_","_"],
                    ["_","_","_"]];

test("should input a board which is not finished, and should return it as much", () =>{
    expect(check_board(empty_board)).toBe("Game not Finished");
})

// Let's test an board that is full of X's and O's, but cannot progress any further

let static_board = [["X","O","X"],
                    ["X","O","O"],
                    ["O","X","O"]];

test("should input a board which is finished, but has no winner, and should return it as much", () =>{
    expect(check_board(static_board)).toBe("No Winner");
})

/**
 * Unit tests for player_win function
 */

// Let's test the horizontal positions
let x_board_win_horizontal_top = [["X","X","X"],
                                ["_","_","_"],
                                ["O","O","_"]];

test("Should input a board where the player playing X has won in a horizontal position on the top row, " +
    "and the function should recognise this as such", () =>{
    expect(player_win(x_board_win_horizontal_top, "X")).toBe(true);
})

test("Like for the above but should fail with wrong player", () =>{
    expect(player_win(x_board_win_horizontal_top, "O")).toBe(false);
})

let o_board_win_horizontal_bottom = [["X","X","_"],
                                ["_","_","_"],
                                ["O","O","O"]];

test("Should input a board where the player playing X has won in a horizontal on the bottom row, " +
    "and the function should recognise this as such", () =>{
    expect(player_win(o_board_win_horizontal_bottom, "O")).toBe(true);
})

test("Like for the above but should fail with wrong player", () =>{
    expect(player_win(o_board_win_horizontal_bottom, "X")).toBe(false);
})

let o_board_win_horizontal_middle = [["X","X","_"],
                                    ["O","O","O"],
                                    ["_","_","_"]];

test("Should input a board where the player playing X has won in a horizontal on the bottom row, " +
    "and the function should recognise this as such", () =>{
    expect(player_win(o_board_win_horizontal_middle, "O")).toBe(true);
})

test("Like for the above but should fail with wrong player", () =>{
    expect(player_win(o_board_win_horizontal_middle, "X")).toBe(false);
})



// Let's test the diagonal positions

let o_board_win_left_diagonal = [["O","_","_"],
                                 ["_","O","_"],
                                ["X","X","O"]];

test("Should input a board where the player playing X has won in a left diagonal position" +
    ", and the function should recognise this as such", () =>{
    expect(player_win(o_board_win_left_diagonal, "O")).toBe(true);
})

test("Like for the above but should fail with wrong player", () =>{
    expect(player_win(o_board_win_left_diagonal, "X")).toBe(false);
})

let x_board_win_right_diagonal = [["_","_","X"],
                                    ["_","X","_"],
                                    ["X","O","X"]];

test("Should input a board where the player playing X has won in a left diagonal position" +
    ", and the function should recognise this as such", () =>{
    expect(player_win(x_board_win_right_diagonal, "X")).toBe(true);
})

test("Like for the above but should fail with wrong player", () =>{
    expect(player_win(x_board_win_right_diagonal, "O")).toBe(false);
})

// Let's test the vertical positions

let x_board_win_left_vertical = [["X","_","X"],
                                ["X","X","_"],
                                ["X","O","X"]];

test("Should input a board where the player playing X has won in a left vertical position" +
    ", and the function should recognise this as such", () =>{
    expect(player_win(x_board_win_left_vertical, "X")).toBe(true);
})

test("Like for the above but should fail with wrong player", () =>{
    expect(player_win(x_board_win_left_vertical, "O")).toBe(false);
})

let o_board_win_middle_vertical = [["X","O","X"],
                                    ["X","O","_"],
                                    ["O","O","X"]];

test("Should input a board where the player playing X has won in a left vertical position" +
    ", and the function should recognise this as such", () =>{
    expect(player_win(o_board_win_middle_vertical, "O")).toBe(true);
})

test("Like for the above but should fail with wrong player", () =>{
    expect(player_win(o_board_win_middle_vertical, "X")).toBe(false);
})

let o_board_win_right_vertical = [["X","_","O"],
                                ["X","_","O"],
                                ["_","_","O"]];

test("Should input a board where the player playing O has won in a right vertical position" +
    ", and the function should recognise this as such", () =>{
    expect(player_win(o_board_win_right_vertical, "O")).toBe(true);
})

test("Like for the above but should fail with wrong player", () =>{
    expect(player_win(o_board_win_right_vertical, "X")).toBe(false);
})

// Let's check boards size, if they are not finished, if they have invalid characters


test("The game has not started, thus the board should bot be acceptable", () =>{
    expect(player_win(empty_board, "O")).toBe(false);
})

let irregular_board = [["_","_","_",""],
                    ["_","_","_"],
                    ["_","_","_"]];

test("This is a invalid board as it has a irregular amount of characters in one of the rows", () =>{
    expect(player_win(irregular_board, "O")).toBe(false);
})

test("Let's check the invalid board from before", () =>{
    expect(player_win(invalid_board, "O")).toBe(false);
})

let irregular_number_of_rows_board_too_large = [["O","O","O"],
                                                ["_","_","_"],
                                                ["_","_","_"],
                                                    ["_","_","_"]];

test("This is a invalid board as it has too many rows in the board", () =>{
    expect(player_win(irregular_number_of_rows_board_too_large, "O")).toBe(false);
})

let irregular_number_of_rows_board_too_small = [["O","O","O"],
                                                ["_","_","_"]];

test("This is a invalid board as it has too little rows in the board", () =>{
    expect(player_win(irregular_number_of_rows_board_too_small, "O")).toBe(false);
})

let board_with_big_strings = [["FR","FR","Hello"],
                                    ["OP","_","O"],
                                    ["_","Cha","O"]];

test("This is a invalid board as it is has strings within it", () =>{
    expect(player_win(board_with_big_strings, "O")).toBe(false);
})

/**
 * These are integration tests for the game_state_checker function
 */

// This should fail as third parameter is invalid

test("Incorrect answer to who one", () =>{
    let x_win = [["X","X","X"],
                ["_","_","_"],
                ["O","O","_"]];
    expect(game_state_checker(x_win, "John","Steve",
        "Nerp")).toBe("Invalid answer to who player_one was playing as");
})

test("valid answer to win ask, should pass", () =>{
    let x_win = [["X","X","X"],
                ["_","_","_"],
                ["O","O","_"]];
    expect(game_state_checker(x_win, "John","Steve",
        "yes")).toBe("John won the game");
})

test("valid answer to win ask, should pass", () =>{
    let o_win = [["O","O","O"],
                ["_","_","_"],
                ["X","X","_"]];
    expect(game_state_checker(o_win, "John","Steve",
        "no")).toBe("John won the game");
})

test("The following board is a draw, there should be no winner", () =>{
    let draw_board = [["O","X","O"],
                    ["X","X","O"],
                    ["X","O","X"]];
    expect(game_state_checker(draw_board, "John","Steve",
        "no")).toBe("Game draw, No winner");
})

test("The following board is invalid, the function should recognise it as much as there is string in the board", () =>{
    let invalid_board = [["OR","X","O"],
                        ["X","X","O"],
                        ["X","O","X"]];
    expect(game_state_checker(invalid_board, "John","Steve",
        "no")).toBe("Invalid Board");
})

test("The following board is invalid, the function should recognise it as much as some of the rows have an invalid number " +
    "of characters within them", () =>{
    let invalid_board = [["O","X","O","O"],
                        ["X","X"],
                        ["X","O","X"]];
    expect(game_state_checker(invalid_board, "John","Steve",
        "no")).toBe("Invalid Board");
})

test("The following board is invalid, the function should recognise it as there are too many rows " +
    "of characters within them", () =>{
    let too_many_rows = [["O","X","O","O"],
        ["X","X"],
        ["X","O","X"],[]];
    expect(game_state_checker(too_many_rows, "John","Steve",
        "no")).toBe("Invalid Board");
})

test("The following board is invalid, the function should recognise it as there are too many rows " +
    "of characters within them", () =>{
    let game_not_finished = [["O","_","O"],
                            ["X","X","O"],
                            ["X","O","X"]];
    expect(game_state_checker(game_not_finished, "John","Steve",
        "no")).toBe("Game not Finished");
})
