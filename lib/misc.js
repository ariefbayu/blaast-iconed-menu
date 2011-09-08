exports.getTotalHeight = function (controls) {
    var total = 0;
    controls.forEach(function each(item){
        total += item.dimensions().height;
    });
    total += 20;
    return total;
};


exports.SceneViewBackground = function(imageName, backgroundName, imageHeight, imageWidth){
    var SceneView = require('ui').SceneView;
    var scene = new SceneView({
        style: {
            width: 'fill-parent', 
            height: imageHeight
        }
    });
    scene.setLayers( 2 );

    scene.defineSpritesheet('headerImage', app.imageURL( imageName ), imageWidth, imageHeight);
    scene.add({
        sprite: 'headerImage',
        x: 0,
        y: 0,
        layer: 1,
        frame: 0
    });

    scene.defineSpritesheet('background', app.imageURL( backgroundName ), 1, imageHeight);
    scene.setLayerBackground( 0, {
        sprite: 'background',
        x: 0,
        y: 0,
        width: 400,
        height: imageHeight,
        tile: true
    });

    return scene;
};

exports.IconedMenu = function(menuName, menuHeight, iconName, iconHeight, iconWidth, backgroundName, backgroundNameFocus){
	var TextView = require('ui').TextView;
	var SceneView = require('ui').SceneView;
	
	var scene = new SceneView({
		style: {
			width: 'fill-parent', 
			height: menuHeight
		}
	});
	
	scene.setLayers( 3 );//0=background;1=icon;2=menu title

    scene.defineSpritesheet('icon', app.imageURL( iconName ), iconWidth, iconHeight);
    scene.add({
        sprite: 'icon',
        x: 0,
        y: 0,
        layer: 1,
        frame: 0
    });
    
    if( backgroundName !== '')
    {
		scene.defineSpritesheet('background', app.imageURL( backgroundName ), 1, menuHeight);
		scene.setLayerBackground( 0, {
			sprite: 'background',
			x: 0,
			y: 0,
			width: 400,
			height: menuHeight,
			tile: true
		});
	}

    if( backgroundNameFocus !== '')
    {
		scene.defineSpritesheet('backgroundfocus', app.imageURL( backgroundNameFocus ), 1, menuHeight);
	}
	
	var label = new TextView({
		label: menuName,
		style: {
			border: '5 5 5 5',
			'background-color': 'transparent',
			color: 'black'
		}
	});

	// 2. Use setLayerControl to assign control to the layer
	scene.setLayerControl(2, label);
	scene.translate(2, 42, 2);
	
	scene.on('focus', function(){
		if( backgroundNameFocus !== '')
		{
			scene.setLayerBackground( 0, {
				sprite: 'backgroundfocus',
				x: 0,
				y: 0,
				width: 400,
				height: menuHeight,
				tile: true
			});
		}
	});
	scene.on('blur', function(){
		if( backgroundName !== '')
		{
			scene.setLayerBackground( 0, {
				sprite: 'background',
				x: 0,
				y: 0,
				width: 400,
				height: menuHeight,
				tile: true
			});
		}
	});
	
	return scene;
};
