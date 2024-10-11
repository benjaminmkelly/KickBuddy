<?php

require_once 'IntegrationTestBase.php';

class ProfileTest extends IntegrationTestBase {
    public function testGetMatches()
    {
        // Act
        $response = $this->client->get('profile');

        // Assert
        // Checking status code = 200 (successful)
        $this->assertEquals(200, $response->getStatusCode(), "FAIL: Status Code 200 not received.");

        $responseData = json_decode($response->getBody(), true);

        // Checking array has correct keys
        $this->assertArrayHasKey('length', $responseData, "FAIL: 'length' key missing.");
        $this->assertArrayHasKey('message', $responseData, "FAIL: 'message' key missing.");
        $this->assertArrayHasKey('data', $responseData, "FAIL: 'data' key missing.");

        // Checking 'message' = 'Success'
        $this->assertEquals('Success', $responseData['message'], "FAIL: 'message' value incorrect.");

        // Checking 'data' is an array
        $this->assertIsArray($responseData['data'], "FAIL: 'data' key missing.");
        
        // Checking array has correct keys
        $this->assertArrayHasKey('length', $responseData, "FAIL: 'length' key missing.");

        // Checking data's child items have correct keys and are not empty
        foreach($responseData['data'] as $key) {
            $this->assertArrayHasKey('userID', $key, "FAIL: 'userID' key missing.");
            $this->assertArrayHasKey('playerID', $key, "FAIL: 'playerID' key missing.");
            $this->assertArrayHasKey('name', $key, "FAIL: 'name' key missing.");
            $this->assertArrayHasKey('gamesPlayed', $key, "FAIL: 'gamesPlayed' key missing.");
            $this->assertArrayHasKey('wins', $key, "FAIL: 'wins' key missing.");
            $this->assertArrayHasKey('draws', $key, "FAIL: 'draws' key missing.");
            $this->assertArrayHasKey('losses', $key, "FAIL: 'losses' key missing.");
            $this->assertArrayHasKey('goals', $key, "FAIL: 'goals' key missing.");
            $this->assertArrayHasKey('assists', $key, "FAIL: 'assists' key missing.");
            $this->assertArrayHasKey('avgRating', $key, "FAIL: 'avgRating' key missing.");
            $this->assertArrayHasKey('username', $key, "FAIL: 'username' key missing.");

            $this->assertNotEmpty($key['userID'], "FAIL: 'userID' is empty.");
            $this->assertNotEmpty($key['playerID'], "FAIL: 'playerID' is empty.");
            $this->assertNotEmpty($key['name'], "FAIL: 'name' is empty.");
            $this->assertNotEmpty($key['username'], "FAIL: 'username' is invalid.");
            
        }
    }
}
