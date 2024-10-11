<?php

use GuzzleHttp\Client;
use PHPUnit\Framework\TestCase;

class IntegrationTestBase extends TestCase {
    protected $client;

    protected function setUp(): void {
        $this->client = new Client([
            'base_uri' => 'http://unn-w19014367.newnumyspace.co.uk/kickbuddy/api/',
            'exceptions' => false,
        ]);
    }
}