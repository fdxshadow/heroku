 $(document).ready(function(){
 	$(".btn-danger").click(function(){
	var codigo=$(this).val();	
	$.post('/carrodel',{id:codigo},function(data){
				if(data=='ok'){
					location.reload(true);
				}
			});
		});	
 	});
