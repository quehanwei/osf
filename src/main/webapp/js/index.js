  $(document).ready(function(){
  	$('#feeds').infinitescroll({
  		loading: {
  		    finished: undefined,
  		    finishedMsg: "没有更多的了",
  		                img: null,
  		    msg: null,
  		    msgText: "正在加载...",
  		    selector: null,
  		    speed: 'fast',
  		    start: undefined
  		},
		navSelector  	: "#next:last",
		nextSelector 	: "a#next:last",
		itemSelector 	: ".event",
		dataType	 	: 'html',
		animate      : true, 
		extraScrollPx: 100
  	});

  	
  	var comment_parent = '0';
  	
	$('.input .reply').live('click', function(){
		var event = $(this).parents('.event');
		var comment_object_type = $(event).attr('object_type');
		var comment_object_id = $(event).attr('object_id');
		var comment_content = $(this).prev().val();
		comment_parent = '0';
		$.ajax({
			url: basePath + '/comment/create',
			type: 'POST',
			dataType: 'json',
			data: {comment_object_type: comment_object_type,
				   comment_object_id: comment_object_id,
				   comment_content: comment_content,
				   comment_parent:comment_parent==null?0:comment_parent
				   }
		})
		.success(function(data){
			alert('hehhe');
		});
	});  	
  	
  	$('.actions .reply').live('click', function(){
  		
  		var comment_area = $('.input');
  		$(comment_area).removeClass('labeled').find('.label').remove();
  		$(comment_area).find(':input').val('').focus();
  		
  		var reply_to_html = $('<div class="ui label"></div>');
  		var reply_to_author = $(this).attr('reply_to_author');
  		var reply_to_authorname = $(this).attr('reply_to_authorname');
  		var comment_object_type = $(this).attr('comment_object_type');
  		var comment_object_id = $(this).attr('comment_object_id');
		comment_parent = $(this).attr('comment_parent');
		
  		$(comment_area).addClass('labeled').prepend($(reply_to_html).append('回复:'+reply_to_authorname));
  		
  		$('.input :input').live('blur', function(){
  			$(comment_area).removeClass('labeled').find('.label').remove();
  	  		$(this).val(''); 			
  		});
  	});
  	
  	$('.comment.outline.icon').live('click', function(){
  		
  		var comments_attach = $(this).parents('.content').find('.comments-attach');
  		if($(comments_attach).text() != null && $(comments_attach).text() != ''){
  			$(comments_attach).slideToggle();
  			return false;
  		}
  		
  		var object_type = $(this).parents('.event').attr('type');
  		var object_id = $(this).parents('.event').attr('object_id');
  		var that = $(this);
  		
		$.ajax({
			url: basePath + '/comment/attach/'+object_type+'/'+object_id,
			type: 'GET'
		})
		.success(function(data){	
			$(comments_attach).text('');
			$(data).appendTo($(comments_attach));
			$(comments_attach).slideToggle();
		});
  		
  		
  	});
  	
  })