window.onload = function()
{	
	//制作界面
	var box = document.getElementById('box');//获得ID
	var div;
	for(var i=0 ; i < 20 ; i++)
	{
		for(var j = 0 ; j < 20 ; j++)
		{
			div = document.createElement('div');//创建div
			div.className = 'block';//div的class=block
			div.id = i + '_' + j;
			box.appendChild(div);//追加div(插入)
		}
	}

	//画蛇
	var snake = [{x:0,y:0},{x:0,y:1} ,{x:0,y:2}];
	var hash = {'0_0':true,'0_1':true,'0_2':true};

	for(var i=0; i<snake.length;i++)
	{
		document.getElementById(snake[i].x + '_'  + snake[i].y).className = 'block she';
	}

	//蛇移动
	var dir = 'right';
	var move = function()
	{
		//操作数据
		var jiutou = snake[snake.length-1];
		if (dir === 'right') {var xintou = {x:jiutou.x,y:jiutou.y+1};}
		if (dir === 'left') {var xintou = {x:jiutou.x,y:jiutou.y-1};}
		if (dir === 'top') {var xintou = {x:jiutou.x-1,y:jiutou.y};}
		if (dir === 'bottom') {var xintou = {x:jiutou.x+1,y:jiutou.y};}



		if(xintou.x< 0|| xintou.x>19 || xintou.y<0 || xintou.y> 19 || hash[xintou.x+'_'+xintou.y])
		{
			// clearInterval(t);
			var jgg = document.getElementById('jgg');
				jgg.style.opacity=1;
				setTimeout(function() {jgg.style.opacity=0;}, 1000);
			gameOver();
			// history.go(0);
			return;
			
		}

		//操作界面		
		snake.push(xintou);//加头
		hash[xintou.x+'_'+xintou.y] = true;
		document.getElementById(xintou.x + '_'  + xintou.y).className = 'block she';	

		if ( xintou.x === food.x && xintou.y === food.y)
		{
			food = dropfood();

			j++;
			if(j%4==0)//蛇身长度每增加4个，就增加0.2秒速度
			{
	        	time=time-200;
	        }
	        clearInterval(t);//清除时间

	        t = setInterval(move,time);
	        if (j%3==0) //每吃够3个原有的食物，就多给一个
	        {
				dropfood();
				var jg = document.getElementById('jg');
				jg.style.opacity=1;
				setTimeout(function() {jg.style.opacity=0;}, 1000);
			};
        		// console.log(time);
        		// console.log(j);
		}
		else
		{
			var weiba = snake.shift();//去尾
			delete hash[weiba.x + '_' + weiba.y];
			document.getElementById(weiba.x + '_' + weiba.y).className = 'block'; 
		}

	}

	var j=0;//加速度
	//键盘控制界面
	document.onkeydown=function(e)
	{
		var dic = {'left':37,'right':39,'top':38,'bottom':40}
		if (Math.abs(e.keyCode - dic[dir] ) ===2 )
		{
			return;
		};
		if (e.keyCode ===37 || e.keyCode ===38 || e.keyCode ===39 || e.keyCode ===40 ) 
			{
				if(e.keyCode === 37)
				{
					dir = 'left';
				}
				if(e.keyCode === 38)
				{
					dir = 'top';
				}
				if(e.keyCode === 39)
				{
					dir = 'right';
				}
				if(e.keyCode === 40)
				{
					dir = 'bottom';
				}
				move();
			}
	}

	//投放食物
	var dropfood = function()
	{
		var x = Math.floor(Math.random()*19);
		var y = Math.floor(Math.random()*19);
		while( hash[x + '_' + y ])
		{
			x = Math.floor(Math.random()*19);
			y = Math.floor(Math.random()*19);
		}
		document.getElementById(x + '_' + y).className = 'block shiwu';
				return{x:x , y:y};
	}
	var food = dropfood();
    var time=600;
	var t = setInterval(move,time);
    
	
	// while(snake.length%4==0) {

	// };
//重置游戏
	var gameOver = function()
	{
		for(var i in hash)
		{
			document.getElementById(i).className='block'
		}
		for(var i in snake.length)
		{
			document.getElementById(i).className='block'
		} 
		 snake = [{x:0,y:0},{x:0,y:1} ,{x:0,y:2}];
		 hash = {'0_0':true,'0_1':true,'0_2':true};
		 dir = 'right';
		 for(var i=0; i<snake.length;i++)
		{
		document.getElementById(snake[i].x + '_'  + snake[i].y).className = 'block she';
		}

	}

}