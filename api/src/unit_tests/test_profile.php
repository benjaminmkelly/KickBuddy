<?php
/**
 * Profile Class Unit Test
 */
namespace UnitTest;

require_once __DIR__ . '/../endpoint.php';
require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../profile.php';

use PHPUnit\Framework\TestCase;
use Database;
use Profile;

class Test_Profile extends TestCase
{
    public function testGetDataReturnsExpectedValues()
    {

        $_SERVER['REQUEST_METHOD'] = 'GET';

        // Create a mock of the database class to prevent interaction with actual database
        $dbMock = $this->getMockBuilder(Database::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['executeSQL'])
            ->getMock();

        // Setting what the mock db will return
        $dbMock->method('executeSQL')->willReturn([
            "length" => 5,
            "message" => "Success",
            "data" => [
                [
                    "userID" => "1",
                    "playerID" => "99",
                    "name" => "Ben Kelly",
                    "gamesPlayed" => "3",
                    "wins" => "2",
                    "draws" => "0",
                    "losses" => "1",
                    "goals" => "7",
                    "assists" => "2",
                    "avgRating" => "8",
                    "username" => "ben123"
                ],
                [
                    "userID" => "2",
                    "playerID" => "98",
                    "name" => "John Smith",
                    "gamesPlayed" => "5",
                    "wins" => "1",
                    "draws" => "0",
                    "losses" => "4",
                    "goals" => "2",
                    "assists" => "1",
                    "avgRating" => "5",
                    "username" => "johnnysmith"
                ],
                [
                    "userID" => "3",
                    "playerID" => "97",
                    "name" => "Rick Sanchez",
                    "gamesPlayed" => "4",
                    "wins" => "2",
                    "draws" => "0",
                    "losses" => "2",
                    "goals" => "1",
                    "assists" => "4",
                    "avgRating" => "6",
                    "username" => "ricksanchez809"
                ],
                [
                    "userID" => "4",
                    "playerID" => "96",
                    "name" => "Bob Ross",
                    "gamesPlayed" => "3",
                    "wins" => "3",
                    "draws" => "0",
                    "losses" => "0",
                    "goals" => "4",
                    "assists" => "1",
                    "avgRating" => "7",
                    "username" => "bobross17"
                ],
                [
                    "userID" => "5",
                    "playerID" => "95",
                    "name" => "Steven Segal",
                    "gamesPlayed" => "11",
                    "wins" => "4",
                    "draws" => "0",
                    "losses" => "6",
                    "goals" => "5",
                    "assists" => "3",
                    "avgRating" => "5",
                    "username" => "stevensegal66"
                ]
            ]
        ]);

        // Create new instance of play class and inject mock database
        $profile = new Profile($dbMock);

        // Call getData() method and check result
        // Set expected query results
        $expectedQueryResult = [
            "length" => 5,
            "message" => "Success",
            "data" => [
                [
                    "userID" => "1",
                    "playerID" => "99",
                    "name" => "Ben Kelly",
                    "gamesPlayed" => "3",
                    "wins" => "2",
                    "draws" => "0",
                    "losses" => "1",
                    "goals" => "7",
                    "assists" => "2",
                    "avgRating" => "8",
                    "username" => "ben123"
                ],
                [
                    "userID" => "2",
                    "playerID" => "98",
                    "name" => "John Smith",
                    "gamesPlayed" => "5",
                    "wins" => "1",
                    "draws" => "0",
                    "losses" => "4",
                    "goals" => "2",
                    "assists" => "1",
                    "avgRating" => "5",
                    "username" => "johnnysmith"
                ],
                [
                    "userID" => "3",
                    "playerID" => "97",
                    "name" => "Rick Sanchez",
                    "gamesPlayed" => "4",
                    "wins" => "2",
                    "draws" => "0",
                    "losses" => "2",
                    "goals" => "1",
                    "assists" => "4",
                    "avgRating" => "6",
                    "username" => "ricksanchez809"
                ],
                [
                    "userID" => "4",
                    "playerID" => "96",
                    "name" => "Bob Ross",
                    "gamesPlayed" => "3",
                    "wins" => "3",
                    "draws" => "0",
                    "losses" => "0",
                    "goals" => "4",
                    "assists" => "1",
                    "avgRating" => "7",
                    "username" => "bobross17"
                ],
                [
                    "userID" => "5",
                    "playerID" => "95",
                    "name" => "Steven Segal",
                    "gamesPlayed" => "11",
                    "wins" => "4",
                    "draws" => "0",
                    "losses" => "6",
                    "goals" => "5",
                    "assists" => "3",
                    "avgRating" => "5",
                    "username" => "stevensegal66"
                ]
            ]
        ];
        $this->assertEquals($expectedQueryResult, $profile->getData());


    }
}