<?php  
    header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
    include('conn/connect.php');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
   $contentdata  = file_get_contents("php://input");
   @$getdata = json_decode($contentdata);
   $reportid = $_GET['reportid'];
  // $pass = $getdata->pass;  
  // SELECT * FROM project WHERE name='$getsearch';
  $sql = "SELECT report.projectid,project.projectname,report.reaction_time, report.heating_rate,report.report_date
  FROM report
  INNER JOIN project
  ON report.projectid=project.id
  WHERE projectid = $reportid
  ORDER by project.id DESC";
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