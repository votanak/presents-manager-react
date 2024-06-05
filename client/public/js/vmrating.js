jQuery(function($) {

	// получаем выбранный рейтинг
	function getRatingData(item) {
		var ratingBlock = item.parent('.vm-rating');
		var rating = item.index() + 1; 
		var productId = ratingBlock.data('product-id');
		
		var ratingData = {
				'productId': productId, 
				'rating': rating
		};
		
		return ratingData;
	}

	// проверяем активно ли голосование
	function isAllow(item) {
		var ratingBlock = item.parent('.vm-rating');
		var productId = ratingBlock.data('product-id');
		
		var result = (productId) ? true : false;

		return result; 
	}

	// показываем произвольное сообщение
	function showMessage(message, text) {
		message.html(text);
		setTimeout(function() {
			message.html('');
		}, 1500);
	}

	/* обновляем локальное хранилище с товарами
	за которые пользователь уже голосовал */
	function updateRatingIds(id) {
		if (!localStorage.getItem('productRatingIds')) {
			localStorage.setItem('productRatingIds', id);
		} 

		var currentRatingIds = localStorage.getItem('productRatingIds');
		var arrRatingIds = currentRatingIds.split(',');
		
		if (arrRatingIds.indexOf(String(id)) == -1) {
			arrRatingIds.push(String(id));
		    localStorage.setItem('productRatingIds', arrRatingIds.join(','));
		}	
	}

	/* проверка локального хранилища с товарами
	за которые пользователь голосовал */
	function checkRatingId(id) {
		if (!localStorage.getItem('productRatingIds')) {
			return true;
		} 

		var currentRatingIds = localStorage.getItem('productRatingIds');
		var arrRatingIds = currentRatingIds.split(',');

		if (arrRatingIds.indexOf(String(id)) == -1) {
			return true;
		}	

		return false;
	}

	$('body').on('click', '.vm-rating-item', function() {
		var ratingBlock = $(this).closest('.vm-rating-wrap'),
			averageRating = ratingBlock.find('.average-rating'),
			countVotes = ratingBlock.find('.count-votes'),
			countVotesText = ratingBlock.find('.count-votes-text'),
			message = ratingBlock.find('.vm-rating-message'),
			messageText = '',
			rating,
			count;

		// если голосование активно, то отправляем ajax запрос	
		if (isAllow($(this))) {
			var ratingData = getRatingData($(this));
			var productId = ratingData.productId;
			var request = {
	            'option': 'com_ajax',
	            'plugin': 'vmrating',
	            'format': 'json'   
	        };

	        request = Object.assign({}, request, ratingData);

	        // проверяем голосовал ли пользователь за этот товар
	        if (checkRatingId(productId)) {
		        $.ajax({
		        	type: 'POST',
		        	data: request
		        
		        })
		        .done(function(response) {
		        	if (response.success) {	

		        		console.log(response);
		        		/* если товар уже имеет рейтинг
		        		то вычисляем новое значение */
		        		if (response.data[0][0] == 'success') {
		        			rating = (Number(response.data[0].total_rating) + Number(request.rating)) / (Number(response.data[0].count) + 1);
		        			count = Number(response.data[0].count) + 1;
		        			messageText = '<span class="success">Спасибо за Ваш голос!</span>';
		        		} 

						/* если у товара нет рейтинга
						то устанавливаем новое значение */
		        		if (response.data[0][0] == 'empty') {
		        			rating = Number(request.rating);
		        			count = 1;
		        			messageText = '<span class="success">Спасибо за Ваш голос!</span>';
		        		}
		        		
		        		// если не проходит проверка
		        		if (response.data[0][0] == 'fail') {
		        			messageText = '<span class="error">Вы уже голосовали за данный товар.</span>';
		        		}

		        		// если рейтинг получен, то обновляем значения
		        		if (rating) {
		        			ratingBlock.find('.vm-rating').attr('data-rating', Math.round(rating));

			        		if (averageRating.length) {
			        			averageRating.find('span').html(rating.toFixed(1));
			        		}

			        		if (countVotesText.length) {
			        			countVotesText.find('span').html(count);
			        		}

			        		if (countVotes.length) {
			        			countVotes.html(count);
			        		}

			        		// обновляем локальное хранилище
			        		updateRatingIds(productId);      		
		        		}
		        		// показываем сообщение
						showMessage(message, messageText);	
		        	}
		        });
		    }

		    if (!checkRatingId(productId)) messageText = '<span class="error">Вы уже голосовали за данный товар.</span>';

		    // показываем сообщение
			showMessage(message, messageText);	
		}
	});
});