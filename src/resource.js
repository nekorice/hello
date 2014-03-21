var s_HelloWorld = "res/HelloWorld.png";
var s_CloseNormal = "res/CloseNormal.png";
var s_CloseSelected = "res/CloseSelected.png";
var s_Walk = "res/walk2.png";

var s_jet = "res/jet.png";
var s_Walk_plist = "res/walk2.plist";

var s_tmw_desert_spacing = "res/tmw_desert_spacing.png";
//var s_tmw_desert_spacing_hd = "tmw_desert_spacing-hd.png";
var s_tmx = "res/test.tmx";

//use as a namespace
var res = {


}

var g_var = {
  'player_zorder':2,
  'KEYS' : [],
  'horizon':300,
  'gravity':50,
}

//这里在preload使用用来提前载入资源
var g_resources = [
    //image
    {src:s_HelloWorld},
    {src:s_CloseNormal},
    {src:s_jet},
    {src:s_CloseSelected},
    {src:s_Walk},

    {src:s_tmw_desert_spacing},
    //{src:s_tmw_desert_spacing_hd}, 

    //plist
    {src:s_Walk_plist},

    //fnt

    //tmx
    {src:s_tmx}
    //bgm

    //effect

];