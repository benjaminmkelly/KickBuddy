<?php
/**
 * Play Class Unit Test
 */
namespace UnitTest;

require_once __DIR__ . '/../endpoint.php';
require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../play.php';

use PHPUnit\Framework\TestCase;
use Database;
use Play;

class Test_Play extends TestCase
{
    public function testGetDataReturnsExpectedValues()
    {
        // Create a mock of the database class to prevent interaction with actual database
        $dbMock = $this->getMockBuilder(Database::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['executeSQL'])
            ->getMock();

        // Setting what the mock db will return
        $dbMock->method('executeSQL')->willReturn([
                [
                    'matchName' => 'Campers FC vs Pathetico Madrid',
                    'KODate' => '20/01/23',
                    'KOTime' => '18:00',
                    'venue' => 'The Bowl',
                    'matchID' => '1'
                ],
                [
                    'matchName' => 'Pathetico Madrid vs Peaky Blinders FC',
                    'KODate' => '12/01/23',
                    'KOTime' => '21:00',
                    'venue' => 'Powerleague Gateshead',
                    'matchID' => '2'
                ],
                [
                    'matchName' => 'ABCDE FC vs Whateverton',
                    'KODate' => '15/02/23',
                    'KOTime' => '19:00',
                    'venue' => 'Tommy Clucas Hall',
                    'matchID' => '3'
                ],
                [
                    'matchName' => 'Blunderland vs Moves Like Agger',
                    'KODate' => '13/02/23',
                    'KOTime' => '15:00',
                    'venue' => 'The Bowl',
                    'matchID' => '4'
                ],
                [
                    'matchName' => 'ABCDE FC vs Campers FC',
                    'KODate' => '30/01/23',
                    'KOTime' => '20:00',
                    'venue' => 'Tommy Clucas Hall',
                    'matchID' => '5'
                ]
        ]);

        // Create new instance of play class and inject mock database
        $play = new Play($dbMock);

        // Call getData() method and check result
        // Set expected query results
        $expectedQueryResult = [
            'length' => 5,
            'message' => 'Success',
            'data' => [
                [
                    'matchName' => 'Campers FC vs Pathetico Madrid',
                    'KODate' => '20/01/23',
                    'KOTime' => '18:00',
                    'venue' => 'The Bowl',
                    'matchID' => '1'
                ],
                [
                    'matchName' => 'Pathetico Madrid vs Peaky Blinders FC',
                    'KODate' => '12/01/23',
                    'KOTime' => '21:00',
                    'venue' => 'Powerleague Gateshead',
                    'matchID' => '2'
                ],
                [
                    'matchName' => 'ABCDE FC vs Whateverton',
                    'KODate' => '15/02/23',
                    'KOTime' => '19:00',
                    'venue' => 'Tommy Clucas Hall',
                    'matchID' => '3'
                ],
                [
                    'matchName' => 'Blunderland vs Moves Like Agger',
                    'KODate' => '13/02/23',
                    'KOTime' => '15:00',
                    'venue' => 'The Bowl',
                    'matchID' => '4'
                ],
                [
                    'matchName' => 'ABCDE FC vs Campers FC',
                    'KODate' => '30/01/23',
                    'KOTime' => '20:00',
                    'venue' => 'Tommy Clucas Hall',
                    'matchID' => '5'
                ]
            ]
        ];
        $this->assertEquals($expectedQueryResult, $play->getData());

      
    }
}