<?php

class BugReport extends Endpoint
{

    public function __construct()
    {

        if ($_SERVER["REQUEST_METHOD"] === "POST") {
            // Get text input from request
            $data = json_decode(file_get_contents("php://input"), true);
            $text = isset($data["text"]) ? $data["text"] : "";

            // Save text to file
            file_put_contents(__DIR__ . "/bugreports.txt", $text . PHP_EOL, FILE_APPEND);

            
            $this->setData(array(
                "message" => "Success",
                "data" => $text
            ));
        } else {
            // Return error response
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "An error has occurred.",
            ]);
        }
    }
}
