<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title> Forms </title>
        
    </head>
    <?php
		 $background = "";
         if(empty($_POST['theme'])==false)
         {
            $background =$_POST['theme'];
         }
    ?>
    <body style="font-style:italic; background-color:<?php echo $background; ?>;">
        
        <p>
            <?php
                if(empty($_POST['name'])==false)
                {
                    echo $_POST['name'];
                }
                else 
                {
                    echo "Name cannot be empty";
                }
            ?>
        </p>
        <p>
            <?php
                if(empty($_POST['uname'])==false)
                {
                    echo $_POST['uname'];
                }
                else 
                {
                    echo "Username cannot be empty";
                }
            ?>
        </p>
        <p>
           <?php 
                if(empty($_POST['pass'])==false)
                {
                    echo $_POST['pass'];
                    
                }
                else 
                {
                    echo "Your password cannot be empty!";
                }
            ?>
        </p>
        <p>
            <?php
                if(empty($_POST['adress'])==false)
                {
                    echo "Adress: ".$_POST['adress'];
                }
                else 
                {
                    echo "Adress: Not Provided";
                }
            ?>
        </p>
        <p>

           <?php
              
               if(empty($_POST['country'])==false)
               {
                   $dashPosition = strpos($_POST['country'],"-")+1;
                   $countryName = substr($_POST['country'],$dashPosition);
                   echo $countryName."\n";
 
               }
               else 
               {
                   echo "Your country name cannot be empty";
               }
           ?>
       </p>
       <p>
            <?php
                if(empty($_POST['zip'])==false)
                {
                    echo "Zip: ".$_POST['zip'];
                }
                else 
                {
                    echo "Not Provided";
                }
            ?>
        </p>
       <p>
           
            <?php
                if(empty($_POST['email'])==false)
                {
                    if(is_bool($isThereA = strpos($_POST['email'],"@")))
                    {
                        echo "Your email must contain the '@' character";
                    }
                    else
                    {
                        $afterA = substr($_POST['email'],$isThereA);
                        $istThereDot = str_contains($afterA,".");
                        if($istThereDot)
                        {
                            echo "Email:".$_POST['email'];
                        }
                        else
                        {
                            echo "Your email must contain . after the @ sign";
                        }
                    }
                    
                }
                else 
                {
                    echo "Your email cannot be empty";
                }
            ?>

        </p>
        <p>  
           <?php
               if(empty($_POST['sex'])==false)
               {
                   switch($_POST['sex'])
                   {
                        case "male":
                            echo "Male";
                            break; 
                        case "female":
                            echo "Female";
                        default:
                            echo "Select one brooooo";
                   }
               }
               else 
               {
                   echo "Gender must be declared!";
               }
           ?>
       </p> 

        <p>  
           <?php
               if(empty($_POST['lang'])==false)
               {
                   for($i=0;$i<sizeof($_POST['lang']);$i++)
                   {
                        echo $_POST['lang'][$i]."<br>\n";
                   } 
                   echo "<br>";
               }
               else 
               {
                   echo "Your Languages cannot be empty";
               }
           ?>
       </p>
        <p>

            <?php
                if(empty($_POST['about'])==false)
                {
                     echo "About: ".$_POST['about'];
                }
                else{
                    echo "About: Not Provided";
                }
            ?>
       <p>

       </p>

    </body>
</html>