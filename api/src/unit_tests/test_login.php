<?php
/**
 * Login Class Unit Test
 */
namespace UnitTest;

define('SECRET', 's3cr3t');

require_once __DIR__ . '/../endpoint.php';
require_once __DIR__ . '/../database.php';
require_once __DIR__ . '/../login.php';

use PHPUnit\Framework\TestCase;
use Database;
use Login;

class Test_Login extends TestCase
{
    public function testSuccessfulLogin()
    {
        // Create a mock of the database class to prevent interaction with the actual database
        $dbMock = $this->getMockBuilder(Database::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['executeSQL'])
            ->getMock();

        // Set what the mock db will return
        $dbMock->method('executeSQL')->willReturn([
            [
                'userID' => 1,
                'username' => 'ben123',
                'password' => '$2y$10$Y1Oj01jOt6WX9yPkfCBXw.V7PsgFqAIc0YaM4AWcWKlarxNVGxwem',
            ],
        ]);

        // Set the server variables to simulate a POST request
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $_SERVER['PHP_AUTH_USER'] = 'ben123';
        $_SERVER['PHP_AUTH_PW'] = 'password';
        $_SERVER['HTTP_HOST'] = 'localhost';

        try {
            // Create a new instance of the Login class and inject the mock database
            $login = new Login($dbMock);
    
            // Call getData() method and check the result
            $loginData = $login->getData();
            $this->assertTrue($loginData['auth']);
            $this->assertEquals('success', $loginData['message']);
            $this->assertArrayHasKey('data', $loginData);
            $this->assertArrayHasKey('token', $loginData['data']);
        } catch (\ClientErrorException $e) {
            $this->fail("Unexpected exception: " . $e->getMessage());
        }
    }
}