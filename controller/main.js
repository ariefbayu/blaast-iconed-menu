var _ = require('common/util');
var misc = require('../lib/misc');
var TextView = require('ui').TextView;
var LinearLayout = require('ui').LinearLayout;
var SceneView = require('ui').SceneView;
var ImageView = require('ui').ImageView;
var db = require('../lib/db').DB;

_.extend(exports, {
    ':load': function() {
        var self = this;
        self.clear();
        
        var i = 1;
        db.forEach(function(item){
            var temp;
            console.log('doing item #' + i);
            self.add( item.url, misc.IconedMenu( item.title, 44, item.image, 40, 40, 'logo.png', 'header_background.png' ) );
			
            i++;
        });
        //self.get('LL').focusItem(1);
        console.log('View was loaded');
    },

    ':resized': function(width, height) {
        console.log('View was resized to ' + width + 'x' + height);
    },

    ':keydown': function(key) {
        console.log('Key down: '+ key);
    },

    ':keyup': function(key) {
        console.log('Key up: ' + key);
    },

    ':keypress': function(key) {
        console.log('Key press: ' + key);
        if (this.index === undefined) {
            if (this.size() >= 0) {
                this.focusItem(0);
            }
        } else if (key === 'up' || key === 'down') {
            var next = this.index + (key === 'up' ? -1 : 1);

            if (next < 0) {
                next = 0;
            } else if (next > (this.size()-1)) {
                next = this.size()-1;
            }

            if (this.index === next) {
                return;
            }

            this.focusItem(next);
        } else if (key === 'fire') {
            this.get(this.index).emit('activate');
        }
    },

    ':active': function() {
        console.log('View is active');
    },

    ':inactive': function() {
        console.log('View is inactive');
    },
    
    focusItem: function(index) {
        if (this.index !== undefined) {
            this.get(this.index).emit('blur');
        }
        this.index = index;
        this.get(index).emit('focus');
        if(index === 1){
            this.scrollTop(0);
        }
        console.log(index);
        this.scrollTo(index);
    }
});
