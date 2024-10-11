<?php
/**
 * Match History Endpoint
 * allows user to input data to match history
 * 
 * @author Ben Kelly w19014367
 */
class MatchHistory extends Endpoint {

    public function __construct() {
        try {
            http_response_code(200);
            
            $db = new Database("db/kickbuddy.sqlite");
            $sql = "INSERT INTO matchHistory (wins, draws, losses, goals, assists, rating)
            VALUES (6, 2, 3, 5, 3, 6.8)";
            $params = [];

            $queryResult = $db->executeSQL($sql, $params);

            $this->setData(array(
                "length" => count($queryResult),
                "message" => "Success",
            ));


        } catch (PDOException $ex) {
            /** 500 - Generic error resposne CHANGE */
            http_response_code(500);
            echo ($ex);
        }
    }

}