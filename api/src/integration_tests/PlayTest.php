<?php

require_once 'IntegrationTestBase.php';

class PlayTest extends IntegrationTestBase {
    public function testGetMatches()
    {
        // Act
        $response = $this->client->get('play');

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

        // Checking data's child items have correct keys and are not empty
        foreach($responseData['data'] as $key) {
            $this->assertArrayHasKey('matchName', $key, "FAIL: 'matchName' key missing.");
            $this->assertArrayHasKey('KODate', $key, "FAIL: 'KODate' key missing.");
            $this->assertArrayHasKey('KOTime', $key, "FAIL: 'KOTime' key missing.");
            $this->assertArrayHasKey('venue', $key, "FAIL: 'venue' key missing.");
            $this->assertArrayHasKey('matchID', $key, "FAIL: 'matchID' key missing.");

            $this->assertNotEmpty($key['matchName'], "FAIL: 'matchName' is empty.");
            $this->assertNotEmpty($key['KODate'], "FAIL: 'KODate' is empty.");
            $this->assertNotEmpty($key['KOTime'], "FAIL: 'KOTime' is empty.");
            $this->assertNotEmpty($key['venue'], "FAIL: 'venue' is empty.");
            $this->assertGreaterThan(0, $key['matchID'], "FAIL: 'matchID' is invalid.");
        }
    }
}
