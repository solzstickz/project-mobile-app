<?php  
    header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
    include('conn/connect.php');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
   $contentdata  = file_get_contents("php://input");
   @$getdata = json_decode($contentdata);
   @$getsearch =$_GET['name']; 
  // $pass = $getdata->pass;  
  // SELECT * FROM project WHERE name='$getsearch';
  $sql = "SELECT * FROM project ORDER BY id DESC LIMiT 1;";
   $result = mysqli_query($con,$sql);
   $numrow = mysqli_num_rows($result);
  if($numrow > 0){
       $arr = array();
       while($row = mysqli_fetch_assoc($result)){
         $arr[] = $row;
       }
   
      echo json_encode($arr);
      mysqli_close($con);
  }else{
      echo json_encode(null);
  }

?>