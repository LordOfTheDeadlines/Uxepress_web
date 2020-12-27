$(document).ready(function () {
    console.log("submit")
    $('#submit-button').click( function(){
        if($('#news-text').val().length == 0){
            $('#news-text').css({
                'color': 'red',
                'border-color': 'red'
            });
        }
        try{
            var file = document.getElementById('input-container').files[0]; 
            console.log(file.name);
            console.log(file.type);
        }
        catch{
            console.log("null")
        }
    })

    $('#news-text').bind('input', function(){
        $('#currChar').html($(this).val().length);
        
    });
    $('#news-text').click( function(){
        $(this).css({
            "color": "black" ,
            'border-color':'black'                   
        });
    });
    
    $('#input-container').change( function(){
         $('#file-name').css({
                "display": "inline"                        
            });
            var file = document.getElementById('input-container').files[0]; 
            if(file.type != "image/png"  && file.type != "image/jpeg"){

                $('#file-name').html("Неверный формат изображения");
                $("#submit-button").prop('disabled', true);                
                $('#file-name').css({
                    "color": "red",
                    "padding-left":"70px",                        
                });
            }else{
                $('#file-name').html(file.name);
                $("#submit-button").prop('disabled', false);
                $('#file-name').css({
                    "color": "black"                        
                });
                preview(file)
            }

    });
    $("#revoke-btn").click( function(){
        
        $('#preview-img').remove();
        $('#file-name').css({
            "display": "none"                       
        });
        $(this).css({
            "display": "none"                       
        });
    });
    
}); 
function preview(f) {
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
            // Render thumbnail.
            var span = document.createElement('span');
            span.innerHTML = ['<img id="preview-img" title="', escape(theFile.name), '" src="', e.target.result, '" />'].join('');
            document.getElementById('img-wrap').insertBefore(span, null);
            $('#preview-img').css({
                "width": "50px"                        
            });
            $('#revoke-btn').css({
                "display": "inline"                        
            });
        };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
}


