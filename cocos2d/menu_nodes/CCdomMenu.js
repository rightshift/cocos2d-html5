/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Created by JetBrains WebStorm.
 User: wuhao
 Date: 12-3-22

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var cc = cc = cc || {};
cc.Menu = cc.domNode.extend({
    _container:null,
    init: function()
    {
        if(!cc.$("#Cocos2dGameContainer"))
        {
            this.setupHTML();
        }
        else
        {
            this._container = cc.$("#Cocos2dGameContainer");
        }
    },
    setupHTML: function()
    {
        //set up html;
        //get the canvas
        var canvas = cc.canvas;
        this._container = cc.$new("div");
        this._container.id ="Cocos2dGameContainer";
        this._container.style.position = "absolute";
        this._container.style.overflow = "hidden";

        cc.gameDiv.insertBefore(this._container, canvas);
        this._container.appendChild(canvas);
    },
    initWithItems: function(args)
    {
        this.init();
        this._domElement.id = "Cocos2dMenuLayer"+Date.now();
        this._domElement.className = "Cocos2dMenuLayer";
        this.style.width = cc.Director.sharedDirector().getWinSize().width+"px";
        this.style.height = 0;
        this.style.bottom = 0;
        this.style.position = "absolute";
        this._container.appendChild(this._domElement);
        cc.TouchDispatcher.registerHtmlElementEvent(this._domElement);
        this.style.cursor = "crosshair";


        for(var i = 0; i < args.length; i++)
        {
            if(args[i])
            {
                this._domElement.appendChild(args[i].getElement());
            }
        }
    },
    onEnter:function(){
        this.show();
    },
    onExit:function(){
        this.hide();
    },
    hide: function()//hide all children!
    {
        this.style.visibility = "hidden";
    },
    show: function()
    {
        this.style.visibility = "visible";
    },
    addChild: function(child, zindex)
    {
        if(zindex)
        {
            child._setZOrder(zindex);
        }
        if(child.getElement)
        {
            this._domElement.appendChild(child.getElement());
        }
    }
});
cc.Menu.menuWithItems = function()
{
    pret = new cc.Menu();
    pret.initWithItems(arguments);
    return pret;
};