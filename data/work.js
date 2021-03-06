var WORK_TAB_NAME = {
	work:"工作台",
	tech:"旧电脑",
	lab:"实验室",
	handwork:"制作",
	bed:"睡袋",
	cook:"炊具",
	forge:"熔炉",
	filter:"过滤器"
};

var COOK_DATA = {};
var COOK_RESULT = {};

var TOOL_FINISHED = [];
var TOOL_LEVEL = {
	work:0,
	tech:0,
	lab:0,
	handwork:0,
	bed:0,
	cook:0,
	forge:0,
	filter:0,
	train:0
};
var TOOL_DATA = {};
var TOOL_DATA_INIT = {
	//====生活====
	sleep:{
		name:'睡觉',
		desc:'适当的休息能让身体恢复好状态。',
		recover:{energy:5, san:1},
		cost:60,
		show:true,
		type:['bed']
	},
	train_endurance:{
		name:'体质训练',
		desc:'坚持做俯卧撑、深蹲、仰卧起坐和跑步，你会变得更加强壮。',
		recover:{endurance:2.4},
		cost:60,
		show:true,
		type:['train']
	},
	train_perception:{
		name:'感知训练',
		desc:'通过冥想和反应训练来提高感知，速度相对缓慢。',
		recover:{perception:1.4},
		cost:60,
		show:true,
		type:['train']
	},
	train_agility:{
		name:'灵巧训练',
		desc:'反复地练习以提高自身灵巧。',
		recover:{agility:1.8},
		cost:60,
		show:true,
		type:['train']
	},
	lantern:{
		name:'长明灯',
		desc:'让家里不再黑暗。',
		require:{grease:5, wood:10},
		cost:60,
		only:true,
		show:true,
		type:['work'],
		upgrade:'delete MAP_DATA.home.buff;'
		+'removeBuff("dark_1");'
	},
	compass:{
		name:'指南针',
		desc:'让你在外出时能找到回家的路，从此可以对未知地域进行探索。',
		require:{ore:1, metal:1, part:4},
		cost:30,
		show:true,
		only:true,
		type:['work'],
		upgrade:'EXPLORE_FLAG = true;'
		+'EXPLORE_LASTTIME = new Date(sysTime.getTime() - 10*24*60*60*1000);'
		+'if(PLAYER_STATUS.tech.value>=15){TOOL_DATA.map_1.show = true;}else{TOOL_DATA.map_1.tech = 15;}'
		+'if(PLAYER_STATUS.tech.value>=15){TOOL_DATA.compass_1.show = true;}else{TOOL_DATA.compass_1.tech = 15;}'
	},
	map_1:{
		name:'骑术',
		desc:'学会骑马出行，探索时间上限缩短至10小时，地点间移动用时缩短20%。',
		require:{hay:60, water:40, hippophae:30},
		cost:120,
		only:true,
		type:['work'],
		upgrade:'EXPLORE_TIME = 600;'
		+'if(PLAYER_STATUS.tech.value>=60){TOOL_DATA.map_2.show = true;}else{TOOL_DATA.map_2.tech = 60;}'
		+'MOVE_SPEED -= 0.2;'
	},
	map_2:{
		name:'制图术',
		desc:'增强辨认方位的能力，探索时间上限缩短至8小时。',
		require:{leather:10},
		cost:120,
		only:true,
		type:['work'],
		upgrade:'EXPLORE_TIME = 480;'
		+'if(PLAYER_STATUS.tech.value>=120){TOOL_DATA.map_3.show = true;}else{TOOL_DATA.map_3.tech = 120;}'
	},
	map_3:{
		name:'载具',
		desc:'使用交通工具出行，探索时间上限缩短至6小时，地点间移动用时缩短45%。',
		require:{metal:300, part:300, gas:100},
		cost:180,
		only:true,
		type:['work'],
		upgrade:'EXPLORE_TIME = 360;'
		+'if(PLAYER_STATUS.tech.value>=140){TOOL_DATA.compass_3.show = true;}else{TOOL_DATA.compass_3.tech = 140;}'
		+'MOVE_SPEED -= 0.45;'
	},
	compass_1:{
		name:'望远镜',
		desc:'增强发现新地点的能力，基础探索成功率提升至43%。',
		require:{leather:10},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'EXPLORE_RATE = 43;'
		+'if(PLAYER_STATUS.tech.value>=60){TOOL_DATA.compass_2.show = true;}else{TOOL_DATA.compass_2.tech = 60;}'
	},
	compass_2:{
		name:'电子地图',
		desc:'解锁旧电脑中的电子地图，基础成功率提升至57%。',
		require:{dataChip:1},
		cost:120,
		only:true,
		type:['tech'],
		upgrade:'EXPLORE_RATE = 57;'
	},
	compass_3:{
		name:'改装车',
		desc:'使用更强劲的核动力载具，同样的时间能到达更多地点，探索时间上限缩短至5小时，基础成功率提升至72%。',
		require:{uranium:30, plutonium:10},
		cost:240,
		only:true,
		type:['work'],
		upgrade:'EXPLORE_TIME = 300;'
		+'EXPLORE_RATE = 72;'
	},
	bed_1:{
		name:'草垫',
		desc:'在地上铺些草能好睡一点，提升精力恢复。',
		require:{hay:25},
		cost:60,
		only:true,
		show:true,
		type:['handwork'],
		upgrade:'MAP_DATA.home.place.bed.name = "草垫";'
		+'TOOL_DATA.sleep.recover = {energy:7, san:1};'
		+'TOOL_DATA.bed_2.show = true;'
	},
	bed_2:{
		name:'木床',
		desc:'用木头做成的床，不用再睡地上了。提升精力恢复。',
		require:{wood:60},
		cost:180,
		only:true,
		type:['bed'],
		upgrade:'MAP_DATA.home.place.bed.name = "木床";'
		+'WORK_TAB_NAME.bed = "木床";'
		+'TOOL_DATA.sleep.recover = {energy:10, san:1};'
		+'TOOL_DATA.bed_3.show = true;'
	},
	bed_3:{
		name:'床垫',
		desc:'升级木床，并在床上铺一层舒适的床垫，提升精力恢复。',
		require:{wood:40, hay:80},
		cost:60,
		only:true,
		type:['bed'],
		upgrade:'TOOL_DATA.sleep.recover = {energy:15, san:1};'
		+'TOOL_DATA.bed_4.show = true;'
	},
	bed_4:{
		name:'枕头',
		desc:'加个枕头让你睡得更香。提升理智恢复，休息时开始恢复生命。',
		require:{cloth:20, hay:30},
		cost:60,
		only:true,
		type:['bed'],
		upgrade:'TOOL_DATA.sleep.recover = {energy:15, san:2, life:1};'
		+'TOOL_DATA.bed_5.show = true;'
	},
	bed_5:{
		name:'软床',
		desc:'使用动物毛皮升级你的床。提升各项恢复数值。',
		require:{fur:50, cloth:50, hay:60},
		cost:210,
		only:true,
		type:['bed'],
		upgrade:'MAP_DATA.home.place.bed.name = "软床";'
		+'WORK_TAB_NAME.bed = "软床";'
		+'TOOL_DATA.sleep.recover = {energy:20, san:3, life:2};'
		+'TOOL_DATA.bed_6.show = true;'
	},
	bed_6:{
		name:'恢复舱',
		desc:'在睡眠中释放特定电磁波，促进身体自我恢复。',
		require:{part:70, wire:30, eTube:10},
		cost:420,
		only:true,
		type:['bed'],
		upgrade:'MAP_DATA.home.place.bed.name = "恢复舱";'
		+'WORK_TAB_NAME.bed = "恢复舱";'
		+'TOOL_DATA.sleep.recover = {energy:25, san:4, life:3};'
	},
	research_1:{
		name:'研究',
		desc:'花费大量的时间学习数据库中的知识，提高技术水平。',
		recover:{tech:0.5},
		cost:60,
		show:true,
		type:['tech']
	},
	workspeed_1:{
		name:'模具',
		desc:'所有物品制造速度加快10%。',
		require:{wood:80, metal:40},
		cost:240,
		only:true,
		show:true,
		type:['tech'],
		upgrade:'WORK_SPEED = 0.9;'
		+"TOOL_DATA.workspeed_2.show = true;"
	},
	workspeed_2:{
		name:'车床技术',
		desc:'所有物品制造速度加快10%。',
		require:{part:40, wire:50},
		cost:240,
		only:true,
		type:['tech'],
		upgrade:'WORK_SPEED = 0.8;'
		+"TOOL_DATA.workspeed_3.show = true;"
	},
	workspeed_3:{
		name:'生产线',
		desc:'所有物品制造速度加快10%。',
		require:{alloy:50, eTube:20, uranium:10},
		cost:240,
		only:true,
		type:['tech'],
		upgrade:'WORK_SPEED = 0.7;'
		+"TOOL_DATA.workspeed_4.show = true;"
	},
	workspeed_4:{
		name:'自动机械',
		desc:'所有物品制造速度加快10%。',
		require:{chip:10, uranium:40, plutonium:10},
		cost:240,
		only:true,
		type:['tech'],
		upgrade:'WORK_SPEED = 0.6;'
	},
	workbench_1:{
		name:'技术升级',
		desc:'提升工作台技术等级至2级，可以制造更先进的物品。',
		require:{wood:100, stone:50, metal:50},
		cost:240,
		only:true,
		show:true,
		type:['tech'],
		upgrade:'TOOL_LEVEL.work = 2;'
		+'updateStatus("tech", 0);'
		+'TOOL_DATA.workbench_2.show = true;'
	},
	workbench_2:{
		name:'技术升级',
		desc:'提升工作台技术等级至3级，可以制造更先进的物品。',
		require:{wire:50, gas:50, part:75},
		cost:240,
		only:true,
		type:['tech'],
		upgrade:'TOOL_LEVEL.work = 3;'
		+'updateStatus("tech", 0);'
		+'TOOL_DATA.workbench_3.show = true;'
	},
	workbench_3:{
		name:'技术升级',
		desc:'提升工作台技术等级至4级，可以制造更先进的物品。',
		require:{eTube:25, alloy:50, chip:10},
		cost:240,
		only:true,
		type:['tech'],
		upgrade:'TOOL_LEVEL.work = 4;'
		+'updateStatus("tech", 0);'
	},
	farm:{
		name:'农田',
		desc:'在地洞附近开垦一块田地，自己种庄稼。',
		require:{hoe:60, manure:10},
		cost:300,
		only:true,
		type:['handwork'],
		upgrade:'MAP_DATA.home.place.farm.show = true;'
		+'TOOL_DATA.farm_1.show = true;'
	},
	farm_1:{
		name:'农田扩建',
		desc:'耕地数量上限增加至2。',
		require:{hoe:40, manure:5},
		cost:120,
		only:true,
		type:['handwork'],
		upgrade:'FARM_CAP = 2;'
		+'TOOL_DATA.farm_2.show = true;'
	},
	farm_2:{
		name:'农田扩建',
		desc:'耕地数量上限增加至3。',
		require:{hoe:60, manure:8},
		cost:120,
		only:true,
		type:['handwork'],
		upgrade:'FARM_CAP = 3;'
		+'TOOL_DATA.farm_3.show = true;'
	},
	farm_3:{
		name:'农田扩建',
		desc:'耕地数量上限增加至4。',
		require:{hoe:100, manure:15},
		cost:120,
		only:true,
		type:['handwork'],
		upgrade:'FARM_CAP = 4;'
		+'TOOL_DATA.farm_4.show = true;'
	},
	farm_4:{
		name:'农田扩建',
		desc:'耕地数量上限增加至5。',
		require:{hoe_2:80, manure:30},
		cost:120,
		only:true,
		type:['handwork'],
		upgrade:'FARM_CAP = 5;'
	},
	kettle:{
		name:'水壶',
		desc:'木制的简易水壶，可以装5份水。没有水壶，遇到水就只能趴在地上舔。（水壶不作为物品显示，制造即生效）',
		require:{wood:5},
		cost:60,
		only:true,
		show:true,
		type:['work','handwork'],
		upgrade:'KETTLE_VOLUME = 5;'
		+'TOOL_DATA.kettle_1.show = true;'
	},
	kettle_1:{
		name:'升级水壶',
		desc:'木制的简易水壶，可以装20份水。',
		require:{wood:20},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'KETTLE_VOLUME = 20;'
		+'TOOL_DATA.kettle_2.show = true;'
	},
	kettle_2:{
		name:'升级水壶',
		desc:'铁制的水壶，可以装40份水。',
		require:{metal:20},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'KETTLE_VOLUME = 40;'
		+'if(PLAYER_STATUS.tech.value>=50){TOOL_DATA.kettle_3.show = true}else{TOOL_DATA.kettle_3.tech = 50;}'
	},
	kettle_3:{
		name:'升级组合型水壶',
		desc:'水壶数达到2个。',
		require:{metal:40, part:10},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'KETTLE_AMOUNT = 2;'
		+'if(PLAYER_STATUS.tech.value>=150){TOOL_DATA.kettle_4.show=true}else{TOOL_DATA.kettle_4.tech = 150;}'
	},
	kettle_4:{
		name:'升级组合型水壶',
		desc:'水壶数达到3个。',
		require:{alloy:40, part:20},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'KETTLE_AMOUNT = 3;'
	},
	bag_1:{
		name:'增大背包',
		desc:'背包容量增加至14。',
		require:{cloth:15},
		cost:60,
		only:true,
		show:true,
		level:1,
		type:['work'],
		upgrade:'BAG_CAP = 14;'
		+"getSum(BAG_DATA);"
		+"TOOL_DATA.bag_2.show = true;"
	},
	bag_2:{
		name:'增大背包',
		desc:'背包容量增加至16。',
		require:{cloth:40},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BAG_CAP = 16;'
		+"getSum(BAG_DATA);"
		+"TOOL_DATA.bag_3.show = true;"
	},
	bag_3:{
		name:'增大背包',
		desc:'背包容量增加至20。',
		require:{leather:25, cloth:40},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BAG_CAP = 20;'
		+"getSum(BAG_DATA);"
		+"TOOL_DATA.bag_4.show = true;"
	},
	bag_4:{
		name:'增大背包',
		desc:'背包容量增加至24。',
		require:{leather:35, cloth:50, part:10},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BAG_CAP = 24;'
		+"getSum(BAG_DATA);"
		+"TOOL_DATA.bag_5.show = true;"
	},
	bag_5:{
		name:'增大背包',
		desc:'背包容量增加至28。',
		require:{leather:35, cloth:50, part:10},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BAG_CAP = 28;'
		+"getSum(BAG_DATA);"
		+"TOOL_DATA.bag_6.show = true;"
	},
	bag_6:{
		name:'增大背包',
		desc:'背包容量增加至32。',
		require:{leather:35, cloth:50, part:10},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BAG_CAP = 32;'
		+"getSum(BAG_DATA);"
	},
	box_1:{
		name:'箱子',
		desc:'背包里装不下的物品可以存放在储物箱中。',
		require:{wood:30},
		cost:60,
		only:true,
		show:true,
		type:['work'],
		upgrade:'MAP_DATA.home.place.toBox.show = true;'
		+"TOOL_DATA.box_2.show = true;"
	},
	box_2:{
		name:'扩展箱子',
		desc:'储物箱容量增加至14。',
		require:{wood:20},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BOX_CAP = 14;'
		+"TOOL_DATA.box_3.show = true;"
	},
	box_3:{
		name:'扩展箱子',
		desc:'储物箱容量增加至18。',
		require:{wood:40},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BOX_CAP = 18;'
		+"TOOL_DATA.box_4.show = true;"
	},
	box_4:{
		name:'扩展箱子',
		desc:'储物箱容量增加至24。',
		require:{wood:50, part:5},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BOX_CAP = 24;'
		+"TOOL_DATA.box_5.show = true;"
	},
	box_5:{
		name:'扩展箱子',
		desc:'储物箱容量增加至30。',
		require:{wood:50, part:10},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BOX_CAP = 30;'
		+"TOOL_DATA.box_6.show = true;"
	},
	box_6:{
		name:'扩展箱子',
		desc:'储物箱容量增加至36。',
		require:{metal:20, part:10},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BOX_CAP = 36;'
		+"TOOL_DATA.box_7.show = true;"
	},
	box_7:{
		name:'扩展箱子',
		desc:'储物箱容量增加至42。',
		require:{metal:20, part:15},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BOX_CAP = 42;'
		+"TOOL_DATA.box_8.show = true;"
	},
	box_8:{
		name:'扩展箱子',
		desc:'储物箱容量增加至50。',
		require:{alloy:20, part:15},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BOX_CAP = 50;'
		+"TOOL_DATA.box_9.show = true;"
	},
	box_9:{
		name:'扩展箱子',
		desc:'储物箱容量增加至60。',
		require:{alloy:40, part:30},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'BOX_CAP = 60;'
		+"TOOL_DATA.box_10.show = true;"
	},
	box_10:{
		name:'扩展箱子',
		desc:'储物箱容量增加5，上限120。',
		require:{alloy:40, part:30},
		cost:60,
		only:true,
		eternal:true,
		maxAttr:'BOX_CAP',
		max:120,
		type:['work'],
		upgrade:'BOX_CAP += 5;'
	},
	lab:{
		name:'实验室',
		desc:'整理出一个专用的房间作为实验室。',
		require:{wood:42},
		cost:180,
		only:true,
		type:['handwork'],
		upgrade:'MAP_DATA.home.place.lab.show = true;'
	},
	filter_1:{
		name:'过滤器',
		desc:'把脏水中的病菌过滤掉。',
		require:{wood:10, stone:15, metal:10, hay:10},
		cost:60,
		only:true,
		tech:20,
		type:['handwork'],
		upgrade:'MAP_DATA.home.place.filter.show = true;'
		+"TOOL_DATA.filter_2.show = true;"
	},
	filter_2:{
		name:'蒸馏技术',
		desc:'转换脏水时不再出现损失，并可转换尿。',
		require:{glass:10, part:5},
		cost:60,
		only:true,
		type:['tech'],
		upgrade:'TOOL_DATA.water_1.require.dirtyWater = 1;'
		+"TOOL_DATA.water_2.show = true;"
		+"TOOL_DATA.filter_3.show = true;"
	},
	filter_3:{
		name:'净水芯片',
		desc:'将过滤器升级为净水器，能去除水中的放射性物质。',
		require:{chip:2, wire:10, alloy:10},
		cost:60,
		only:true,
		type:['tech'],
		upgrade:'TOOL_DATA.cleanWater.show = true;'
		+'MAP_DATA.home.place.filter.name = "净水器";'
		+'WORK_TAB_NAME.filter = "净水器";'
		+'MAP_DATA.home.place.filter.desc = "产出最干净的水。";'
		+"TOOL_DATA.filter_4.show = true;"
	},
	filter_4:{
		name:'连接装置',
		desc:'连通水井，让水井产出的水直接过滤为纯净水。',
		require:{glass:50, wire:20, alloy:20},
		cost:180,
		only:true,
		type:['filter'],
		upgrade:'for(var get in MAP_DATA.well.resource.water.get){'
		+'	MAP_DATA.well.resource.water.get = {cleanWater:MAP_DATA.well.resource.water.get[get]};'
		+'}'
		+'MAP_DATA.well.resource.water.name = "净水";'
	},
	cook_1:{
		name:'炊具',
		desc:'让你做出更容易下咽的食物。',
		require:{wood:10, stone:15},
		cost:60,
		only:true,
		show:true,
		type:['handwork'],
		upgrade:'MAP_DATA.home.place.cook.show = true;'
		+'TOOL_DATA.cook_2.show = true;'
	},
	cook_2:{
		name:'升级炊具',
		desc:'烹饪速度加快10%。',
		require:{wood:30, metal:20},
		cost:60,
		only:true,
		type:['tech'],
		upgrade:'COOK_SPEED = 0.9;'
		+"TOOL_DATA.cook_3.show = true;"
	},
	cook_3:{
		name:'升级炊具',
		desc:'烹饪速度加快10%。',
		require:{wood:50, part:16},
		cost:60,
		only:true,
		type:['tech'],
		upgrade:'COOK_SPEED = 0.8;'
		+"TOOL_DATA.cook_4.show = true;"
	},
	cook_4:{
		name:'升级炊具',
		desc:'烹饪速度加快10%。',
		require:{wood:50, gas:20, part:15},
		cost:60,
		only:true,
		type:['tech'],
		upgrade:'COOK_SPEED = 0.7;'
		+"TOOL_DATA.cook_5.show = true;"
	},
	cook_5:{
		name:'升级炊具',
		desc:'烹饪速度加快10%。',
		require:{alloy:20, wire:15, gas:50},
		cost:60,
		only:true,
		type:['tech'],
		upgrade:'COOK_SPEED = 0.6;'
	},
	cook_rad:{
		name:'食物净化',
		desc:'烹饪产物将不再受原料的放射性影响。',
		require:{radClear:5, part:50},
		cost:180,
		only:true,
		tech:30,
		type:['tech'],
		upgrade:'for(var tool in TOOL_DATA){'
		+'if(TOOL_DATA[tool].type[0] == "cook"){'
		+'var itemName = TOOL_DATA[tool].turn!=undefined ? TOOL_DATA[tool].turn : tool;'
		+'for(var effect in ITEM_DATA[itemName].effect){'
		+'if(effect=="radiation" && TOOL_DATA[tool].show){'
		+'delete TOOL_DATA[tool].show;'
		+'for(var cleanName in TOOL_DATA){'
	    +'if(cleanName.indexOf("_clean")!=-1 && cleanName.indexOf(itemName)!=-1){'
	    +'TOOL_DATA[cleanName].show = true;}}}}}}'
	},
	well_1:{
		name:'水井',
		desc:'在地洞里挖一口水井，每天产生5份水。',
		require:{shovel:60},
		cost:180,
		only:true,
		tech:20,
		type:['handwork'],
		upgrade:'MAP_DATA.home.place.well.show = true;'
		+'MAP_DATA.well.resource.water.max = 10;'
		+'MAP_DATA.well.resource.water.lastGrow = clone(sysTime);'
		+'TOOL_DATA.well_2.show = true;'
		+'TOOL_DATA.well_7.show = true;'
	},
	well_2:{
		name:'扩建水井',
		desc:'最大储水量增加至15。',
		require:{shovel:80},
		cost:60,
		only:true,
		type:['handwork'],
		upgrade:'MAP_DATA.well.resource.water.max = 15;'
		+'TOOL_DATA.well_3.show = true;'
	},
	well_3:{
		name:'扩建水井',
		desc:'最大储水量增加至20。',
		require:{shovel:100},
		cost:60,
		only:true,
		type:['handwork'],
		upgrade:'MAP_DATA.well.resource.water.max = 20;'
		+'TOOL_DATA.well_4.show = true;'
	},
	well_4:{
		name:'扩建水井',
		desc:'最大储水量增加至25。',
		require:{shovel:100, stone:30},
		cost:60,
		only:true,
		type:['handwork'],
		upgrade:'MAP_DATA.well.resource.water.max = 25;'
		+'TOOL_DATA.well_5.show = true;'
	},
	well_5:{
		name:'扩建水井',
		desc:'最大储水量增加至30。',
		require:{shovel:100, stone:35},
		cost:60,
		only:true,
		type:['handwork'],
		upgrade:'MAP_DATA.well.resource.water.max = 30;'
	},
	well_7:{
		name:'升级水井',
		desc:'每天的水产量增加至6。',
		require:{wood:20, rope:10},
		cost:180,
		only:true,
		type:['handwork'],
		upgrade:'MAP_DATA.well.resource.water.refresh = 240;'
		+'TOOL_DATA.well_8.show = true;'
	},
	well_8:{
		name:'升级水井',
		desc:'每天的水产量增加至7。',
		require:{wood:35, leaRope:60},
		cost:180,
		only:true,
		type:['handwork'],
		upgrade:'MAP_DATA.well.resource.water.refresh = 205;'
		+'TOOL_DATA.well_9.show = true;'
	},
	well_9:{
		name:'升级水井',
		desc:'每天的水产量增加至8。',
		require:{wood:50, cable:240},
		cost:180,
		only:true,
		type:['handwork'],
		upgrade:'MAP_DATA.well.resource.water.refresh = 180;'
		+'TOOL_DATA.well_10.show = true;'
	},
	well_10:{
		name:'升级水井',
		desc:'每天的水产量增加至9。',
		require:{wood:50, cable:240},
		cost:180,
		only:true,
		type:['handwork'],
		upgrade:'MAP_DATA.well.resource.water.refresh = 160;'
		+'TOOL_DATA.well_11.show = true;'
	},
	well_11:{
		name:'升级水井',
		desc:'每天的水产量增加至10。',
		require:{wood:50, cable:240},
		cost:180,
		only:true,
		type:['handwork'],
		upgrade:'MAP_DATA.well.resource.water.refresh = 144;'
	},
	toilet_1:{
		name:'卫生间',
		desc:'可以把排泄物暂时存放起来。家里有个卫生间也可以形成良好习惯，让你不用那么频繁排泄。',
		require:{wood:25, stone:40},
		cost:120,
		only:true,
		tech:10,
		type:['handwork'],
		upgrade:'MAP_DATA.home.place.toilet.show = true;'
		+'EXCRETE_INTERVAL = [30, 22];'
		+'EXCRETE_MAX = [46, 26];'
		+'TOOL_DATA.toilet_2.show = true;'
	},
	toilet_2:{
		name:'升级卫生间',
		desc:'增加堆肥功能，每5小时将屎按1:1或尿按2:1的比例转化为1份肥料。',
		require:{shovel:40},
		cost:120,
		only:true,
		tech:20,
		type:['work'],
		upgrade:'MAP_DATA.toilet.resource.manure_home.max = 5;'
		+'delete MAP_DATA.toilet.resource.manure_home.hide;'
		+'MAP_DATA.toilet.resource.manure_home.lastGrow = clone(sysTime);'
		+'TOOL_DATA.toilet_3.show = true;'
		+'TOOL_DATA.toilet_7.show = true;'
		+'TOOL_DATA.toilet_gas.show = true;'
	},
	toilet_gas:{
		name:'升级卫生间',
		desc:'增加生产瓦斯的功能，每3小时将屎按1:1的比例转化为1份瓦斯。',
		require:{stone:20, stone:20},
		cost:120,
		only:true,
		type:['tech'],
		upgrade:'MAP_DATA.toilet.resource.gas_home.max = 20;'
		+'delete MAP_DATA.toilet.resource.gas_home.hide;'
		+'MAP_DATA.toilet.resource.gas_home.lastGrow = clone(sysTime);'
		+'TOOL_DATA.toilet_gas_1.show = true;'
	},
	toilet_3:{
		name:'增加坑位',
		desc:'肥料存放上限增加至6。',
		require:{shovel:20, stone:15},
		cost:120,
		only:true,
		type:['work'],
		upgrade:'MAP_DATA.toilet.resource.manure_home.max = 6;'
		+'TOOL_DATA.toilet_4.show = true;'
	},
	toilet_4:{
		name:'增加坑位',
		desc:'肥料存放上限增加至7。',
		require:{shovel:20, stone:15},
		cost:120,
		only:true,
		type:['work'],
		upgrade:'MAP_DATA.toilet.resource.manure_home.max = 7;'
		+'TOOL_DATA.toilet_5.show = true;'
	},
	toilet_5:{
		name:'增加坑位',
		desc:'肥料存放上限增加至8。',
		require:{shovel:40, stone:20},
		cost:120,
		only:true,
		type:['work'],
		upgrade:'MAP_DATA.toilet.resource.manure_home.max = 8;'
		+'TOOL_DATA.toilet_6.show = true;'
	},
	toilet_6:{
		name:'增加坑位',
		desc:'肥料存放上限增加至10。',
		require:{shovel:80, stone:40},
		cost:120,
		only:true,
		type:['work'],
		upgrade:'MAP_DATA.toilet.resource.manure_home.max = 10;'
	},
	toilet_7:{
		name:'加速发酵',
		desc:'肥料生成时间缩短至4小时。',
		require:{manure:20},
		cost:120,
		only:true,
		type:['lab'],
		upgrade:'MAP_DATA.toilet.resource.manure_home.refresh = 240;'
		+'TOOL_DATA.toilet_8.show = true;'
	},
	toilet_8:{
		name:'加速发酵',
		desc:'肥料生成时间缩短至3小时。',
		require:{manure:25},
		cost:120,
		only:true,
		type:['lab'],
		upgrade:'MAP_DATA.toilet.resource.manure_home.refresh = 180;'
		+'TOOL_DATA.toilet_9.show = true;'
	},
	toilet_9:{
		name:'加速发酵',
		desc:'肥料生成时间缩短至2小时。',
		require:{manure:30},
		cost:120,
		only:true,
		type:['lab'],
		upgrade:'MAP_DATA.toilet.resource.manure_home.refresh = 120;'
		+'TOOL_DATA.toilet_10.show = true;'
	},
	toilet_10:{
		name:'加速发酵',
		desc:'肥料生成时间缩短至1小时。',
		require:{manure:40},
		cost:120,
		only:true,
		type:['lab'],
		upgrade:'MAP_DATA.toilet.resource.manure_home.refresh = 60;'
	},
	toilet_manure_1:{
		name:'升级微生物',
		desc:'肥料生成量加倍。',
		require:{shit:25, gas:45, manure:50},
		cost:120,
		only:true,
		tech:80,
		type:['lab'],
		upgrade:'MAP_DATA.toilet.resource.manure_home.get = {manure:2};'
	},
	toilet_gas_1:{
		name:'升级瓦斯',
		desc:'瓦斯生成时间缩短至2.5小时。',
		require:{manure:40},
		cost:120,
		only:true,
		type:['tech'],
		upgrade:'MAP_DATA.toilet.resource.gas_home.refresh = 150;'
		+'TOOL_DATA.toilet_gas_2.show = true;'
	},
	toilet_gas_2:{
		name:'升级瓦斯',
		desc:'瓦斯生成时间缩短至2小时。',
		require:{manure:40},
		cost:120,
		only:true,
		type:['tech'],
		upgrade:'MAP_DATA.toilet.resource.gas_home.refresh = 120;'
		+'TOOL_DATA.toilet_gas_3.show = true;'
	},
	toilet_gas_3:{
		name:'升级瓦斯',
		desc:'瓦斯生成时间缩短至1.5小时。',
		require:{manure:40},
		cost:120,
		only:true,
		type:['tech'],
		upgrade:'MAP_DATA.toilet.resource.gas_home.refresh = 90;'
		+'TOOL_DATA.toilet_gas_4.show = true;'
	},
	toilet_gas_4:{
		name:'升级瓦斯',
		desc:'瓦斯生成时间缩短至1小时。',
		require:{manure:40},
		cost:120,
		only:true,
		type:['tech'],
		upgrade:'MAP_DATA.toilet.resource.gas_home.refresh = 60;'
		+'TOOL_DATA.toilet_gas_5.show = true;'
	},
	toilet_gas_5:{
		name:'升级瓦斯',
		desc:'瓦斯生成时间缩短至0.5小时。',
		require:{manure:40},
		cost:120,
		only:true,
		type:['tech'],
		upgrade:'MAP_DATA.toilet.resource.gas_home.refresh = 30;'
	},
	trade_kinds_1:{
		name:'增加商品种类',
		desc:'商队出现时将带来3种商品。',
		require:{cap:20},
		cost:60,
		only:true,
		show:true,
		level:1,
		type:['work'],
		upgrade:'TRADE_KINDS = 3;'
		+'TOOL_DATA.trade_kinds_2.show = true;'
	},
	trade_kinds_2:{
		name:'增加商品种类',
		desc:'商队出现时将带来4种商品。',
		require:{cap:30},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'TRADE_KINDS = 4;'
		+'TOOL_DATA.trade_kinds_3.show = true;'
	},
	trade_kinds_3:{
		name:'增加商品种类',
		desc:'商队出现时将带来5种商品。',
		require:{cap:40},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'TRADE_KINDS = 5;'
		+'TOOL_DATA.trade_kinds_4.show = true;'
	},
	trade_kinds_4:{
		name:'增加商品种类',
		desc:'商队出现时将带来6种商品。',
		require:{cap:50},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'TRADE_KINDS = 6;'
		+'TOOL_DATA.trade_kinds_5.show = true;'
	},
	trade_kinds_5:{
		name:'增加商品种类',
		desc:'商队出现时将带来7种商品。',
		require:{cap:60},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'TRADE_KINDS = 7;'
		+'TOOL_DATA.trade_kinds_6.show = true;'
	},
	trade_kinds_6:{
		name:'增加商品种类',
		desc:'商队出现时将带来8种商品。',
		require:{cap:75},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'TRADE_KINDS = 8;'
	},
	trade_level_1:{
		name:'升级商品',
		desc:'商队将出售更高等级的商品。',
		require:{cap:30, cleanWater:40},
		cost:60,
		only:true,
		show:true,
		level:1,
		type:['work'],
		upgrade:'TRADE_LEVEL = 2;'
		+'TOOL_DATA.trade_level_2.show = true;'
	},
	trade_level_2:{
		name:'升级商品',
		desc:'商队将出售更高等级的商品。',
		require:{cap:50, cleanWater:60},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'TRADE_LEVEL = 3;'
	},
	trade_rate_1:{
		name:'升级商队',
		desc:'提升商队出现概率。',
		require:{cap:10, water:20},
		cost:60,
		only:true,
		show:true,
		level:1,
		type:['work'],
		upgrade:'TRADE_RATE = 21;'
		+'TOOL_DATA.trade_rate_2.show = true;'
	},
	trade_rate_2:{
		name:'升级商队',
		desc:'提升商队出现概率。',
		require:{cap:30, water:60},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'TRADE_RATE = 28;'
		+'TOOL_DATA.trade_rate_3.show = true;'
	},
	trade_rate_3:{
		name:'升级商队',
		desc:'提升商队出现概率。',
		require:{cap:60, cleanWater:60},
		cost:60,
		only:true,
		type:['work'],
		upgrade:'TRADE_RATE = 36;'
	},
	//====熔炉====
	metal:{
		name:'金属',
		desc:'使用矿石熔炼金属。',
		require:{ore:2},
		cost:5,
		show:true,
		type:['forge']
	},
	alloy:{
		name:'合金',
		desc:'使用矿石和金属冶炼合金。',
		require:{ore:1, metal:2},
		cost:10,
		type:['forge']
	},
	silicon:{
		name:'硅',
		desc:'从矿石中提炼硅。',
		require:{ore:2},
		cost:5,
		type:['forge']
	},
	glass:{
		name:'玻璃',
		desc:'制造玻璃。',
		require:{ore:1, stone:1},
		cost:5,
		type:['forge']
	},
	forge_1:{
		name:'玻璃工艺',
		desc:'掌握制造玻璃的技术。',
		require:{ore:30, stone:60},
		cost:120,
		only:true,
		tech:27,
		type:['tech'],
		upgrade:'TOOL_DATA.glass.show = true;'
	},
	forge_2:{
		name:'硅提炼法',
		desc:'掌握提炼硅的技术。',
		require:{ore:50},
		cost:120,
		only:true,
		tech:30,
		type:['tech'],
		upgrade:'TOOL_DATA.silicon.show = true;'
	},
	forge_3:{
		name:'冶炼',
		desc:'掌握冶炼合金的技术。',
		require:{metal:50, ore:50},
		cost:120,
		only:true,
		tech:40,
		type:['tech'],
		upgrade:'TOOL_DATA.alloy.show = true;'
	},
	forge_4:{
		name:'升级熔炉',
		desc:'单次金属产出量增加至2。',
		require:{ore:50},
		cost:120,
		only:true,
		tech:30,
		type:['forge'],
		upgrade:'TOOL_DATA.metal.amount = 2;'
		+'TOOL_DATA.forge_5.show = true;'
	},
	forge_5:{
		name:'升级熔炉',
		desc:'单次金属产出量增加至3。',
		require:{ore:100},
		cost:120,
		only:true,
		type:['forge'],
		upgrade:'TOOL_DATA.metal.amount = 3;'
		+'TOOL_DATA.forge_6.show = true;'
	},
	forge_6:{
		name:'升级熔炉',
		desc:'单次金属产出量增加至4。',
		require:{ore:175},
		cost:120,
		only:true,
		type:['forge'],
		upgrade:'TOOL_DATA.metal.amount = 4;'
	},
	//====食物====
	water_1:{
		name:'水',
		desc:'将脏水过滤为普通的水，无法去除辐射。',
		require:{dirtyWater:2},
		cost:1,
		show:true,
		turn:'water',
		type:['filter']
	},
	water_2:{
		name:'水',
		desc:'将尿转换为普通的水，无法去除辐射。',
		require:{urine:1},
		cost:1,
		turn:'water',
		type:['filter']
	},
	cleanWater:{
		name:'净水',
		desc:'清除水中的放射性物质。',
		require:{water:1},
		cost:2,
		type:['filter']
	},
	toastShit:{
		require:{shit:1, wood:1},
		cost:5,
		show:true,
		type:['cook']
	},
	fries:{
		require:{patato:1, wood:1, grease:1},
		cost:15,
		show:true,
		type:['cook']
	},
	toastPatato:{
		require:{patato:1, wood:1},
		cost:15,
		show:true,
		type:['cook']
	},
	mashedPatato:{
		require:{patato:2, water:1},
		cost:15,
		show:true,
		type:['cook']
	},
	salad:{
		require:{greens:1, hippophae:1},
		cost:5,
		show:true,
		type:['cook']
	},
	jamSalad:{
		require:{salad:1, peanutJam:1},
		cost:5,
		show:true,
		type:['cook']
	},
	hotCactus:{
		require:{cactus:2, wood:1},
		cost:10,
		show:true,
		type:['cook']
	},
	peanutJam:{
		require:{peanut:2, water:1},
		cost:10,
		show:true,
		type:['cook']
	},
	meatsoup:{
		require:{meat:1, water:1, wood:2},
		cost:20,
		show:true,
		type:['cook']
	},
	meatsoup_2:{
		require:{meat:1, cleanWater:1, wood:2},
		cost:20,
		turn:'meatsoup',
		show:true,
		type:['cook']
	},
	schnitzel:{
		require:{meat:1, wood:1, grease:1},
		cost:15,
		type:['cook']
	},
	schnitzel_design:{
		only:true,
		upgrade:'TOOL_DATA.schnitzel.show = true;'
		+'if($.inArray("cook_rad", TOOL_FINISHED) != -1){'
		+'delete TOOL_DATA.schnitzel.show;'
		+'TOOL_DATA.schnitzel_clean.show = true;}',
		type:['cook']
	},
	toastMeat:{
		require:{meat:1, wood:1},
		cost:15,
		show:true,
		type:['cook']
	},
	dryMeat:{
		require:{meat:2},
		cost:15,
		show:true,
		type:['cook']
	},
	toastRoach:{
		require:{roachMeat:1, wood:1},
		cost:15,
		show:true,
		type:['cook']
	},
	toastWorm:{
		require:{wormMeat:1, wood:1},
		cost:15,
		show:true,
		type:['cook']
	},
	wormClub:{
		require:{toastRoach:1, toastWorm:1},
		cost:5,
		show:true,
		type:['cook']
	},
	wormSauce:{
		require:{larva:4, herb:2},
		cost:10,
		type:['cook']
	},
	wormSauce_design:{
		only:true,
		upgrade:'TOOL_DATA.wormSauce.show = true;',
		type:['cook']
	},
	wormClub:{
		require:{toastRoach:1, toastWorm:1},
		cost:5,
		show:true,
		type:['cook']
	},
	fingers:{
		require:{abFinger:5},
		cost:10,
		show:true,
		type:['cook']
	},
	bonesoup:{
		require:{bone:2, meatsoup:1},
		cost:30,
		type:['cook']
	},
	bonesoup_design:{
		only:true,
		upgrade:'TOOL_DATA.bonesoup.show = true;'
		+'if($.inArray("cook_rad", TOOL_FINISHED) != -1){'
		+'delete TOOL_DATA.bonesoup.show;'
		+'TOOL_DATA.bonesoup_clean.show = true;'
		+'TOOL_DATA.bonesoup_clean_2.show = true;}',
		type:['cook']
	},
	vegesoup:{
		require:{greens:1, water:1, wood:2},
		cost:20,
		show:true,
		type:['cook']
	},
	dinner:{
		require:{toastMeat:1, vegesoup:1},
		cost:5,
		type:['cook']
	},
	dinner_design:{
		only:true,
		upgrade:'TOOL_DATA.dinner.show = true;'
		+'if($.inArray("cook_rad", TOOL_FINISHED) != -1){'
		+'delete TOOL_DATA.dinner.show;'
		+'TOOL_DATA.dinner_clean.show = true;'
		+'TOOL_DATA.dinner_clean_2.show = true;'
		+'TOOL_DATA.dinner_clean_3.show = true;'
		+'TOOL_DATA.dinner_clean_4.show = true;}',
		type:['cook']
	},
	tea:{
		require:{flower:1, water:1},
		cost:5,
		show:true,
		type:['cook']
	},
	herbsoup:{
		require:{herb:2, water:1, wood:1},
		cost:10,
		show:true,
		type:['cook']
	},
	hotWater:{
		require:{water:1, wood:1},
		cost:5,
		show:true,
		type:['cook']
	},
	hotWater_2:{
		require:{dirtyWater:1, wood:2},
		cost:5,
		show:true,
		turn:'hotWater',
		type:['cook']
	},
	//去辐射版本
	mashedPatato_clean:{
		require:{patato:2, water:1},
		cost:15,
		type:['cook']
	},
	mashedPatato_clean_2:{
		require:{patato:2, cleanWater:1},
		cost:15,
		turn:'mashedPatato_clean',
		show:true,
		type:['cook']
	},
	peanutJam_clean:{
		require:{peanut:2, water:1},
		cost:10,
		type:['cook']
	},
	peanutJam_clean_2:{
		require:{peanut:2, cleanWater:1},
		cost:10,
		turn:'peanutJam_clean',
		show:true,
		type:['cook']
	},
	jamSalad_clean:{
		require:{salad:1, peanutJam:1},
		cost:10,
		type:['cook']
	},
	jamSalad_clean_2:{
		require:{salad:1, peanutJam_clean:1},
		cost:10,
		turn:'jamSalad_clean',
		show:true,
		type:['cook']
	},
	meatsoup_clean:{
		require:{meat:1, water:1, wood:2},
		cost:20,
		type:['cook']
	},
	meatsoup_clean_2:{
		require:{meat:1, cleanWater:1, wood:2},
		cost:20,
		turn:'meatsoup_clean',
		type:['cook']
	},
	schnitzel_clean:{
		require:{meat:1, wood:1, grease:1},
		cost:15,
		type:['cook']
	},
	toastMeat_clean:{
		require:{meat:1, wood:1},
		cost:15,
		type:['cook']
	},
	dryMeat_clean:{
		require:{meat:2},
		cost:15,
		type:['cook']
	},
	dryMeat_clean_2:{
		require:{dryMeat:1},
		cost:15,
		turn:'dryMeat_clean',
		type:['cook']
	},
	toastRoach_clean:{
		require:{roachMeat:1, wood:1},
		cost:15,
		type:['cook']
	},
	toastWorm_clean:{
		require:{wormMeat:1, wood:1},
		cost:15,
		type:['cook']
	},
	wormClub_clean:{
		require:{toastRoach:1, toastWorm:1},
		cost:5,
		type:['cook']
	},
	wormClub_clean_2:{
		require:{toastRoach_clean:1, toastWorm_clean:1},
		cost:5,
		turn:'wormClub_clean',
		type:['cook']
	},
	wormClub_clean_3:{
		require:{toastRoach:1, toastWorm_clean:1},
		cost:5,
		turn:'wormClub_clean',
		type:['cook']
	},
	wormClub_clean_4:{
		require:{toastRoach_clean:1, toastWorm:1},
		cost:5,
		turn:'wormClub_clean',
		type:['cook']
	},
	dinner_clean:{
		require:{toastMeat:1, vegesoup:1},
		cost:10,
		type:['cook']
	},
	dinner_clean_2:{
		require:{toastMeat_clean:1, vegesoup_clean:1},
		cost:10,
		turn:'dinner_clean',
		type:['cook']
	},
	dinner_clean_3:{
		require:{toastMeat:1, vegesoup_clean:1},
		cost:10,
		turn:'dinner_clean',
		type:['cook']
	},
	dinner_clean_4:{
		require:{toastMeat_clean:1, vegesoup:1},
		cost:10,
		turn:'dinner_clean',
		type:['cook']
	},
	bonesoup_clean:{
		require:{bone:2, meatsoup:1},
		cost:30,
		type:['cook']
	},
	bonesoup_clean_2:{
		require:{bone:2, meatsoup_clean:1},
		cost:30,
		turn:'bonesoup_clean',
		type:['cook']
	},
	vegesoup_clean:{
		require:{greens:1, water:1, wood:2},
		cost:20,
		type:['cook']
	},
	vegesoup_clean_2:{
		require:{greens:1, cleanWater:1, wood:2},
		cost:20,
		turn:'vegesoup_clean',
		show:true,
		type:['cook']
	},
	tea_clean:{
		require:{flower:1, water:1},
		cost:5,
		type:['cook']
	},
	tea_clean_2:{
		require:{flower:1, cleanWater:1},
		cost:5,
		turn:'tea_clean',
		show:true,
		type:['cook']
	},
	herbsoup_clean:{
		require:{herb:2, water:1, wood:1},
		cost:10,
		type:['cook']
	},
	herbsoup_clean_2:{
		require:{herb:2, cleanWater:1, wood:1},
		cost:10,
		turn:'herbsoup_clean',
		show:true,
		type:['cook']
	},
	hotWater_clean:{
		require:{water:1, wood:1},
		cost:5,
		type:['cook']
	},
	hotWater_clean_2:{
		require:{cleanWater:1, wood:1},
		cost:5,
		turn:'hotWater_clean',
		show:true,
		type:['cook']
	},
	
	//====工具====
	lightstick:{
		name:'钻木取火',
		desc:'提供很短时间的照明。',
		require:{wood:1, hay:4},
		cost:1,
		show:true,
		type:['handwork']
	},
	torch:{
		name:'火把',
		desc:'提供一定时间的照明。',
		require:{wood:1, cloth:1, grease:1},
		cost:5,
		show:true,
		type:['handwork']
	},
	crowbar:{
		name:'撬棍',
		desc:'简单的工具，用途多种多样。',
		require:{metal:4, stone:2},
		cost:30,
		show:true,
		type:['work', 'handwork']
	},
	axe:{
		name:'斧头',
		desc:'主要用于伐木的工具。',
		require:{metal:3, wood:3},
		cost:30,
		show:true,
		type:['work']
	},
	shovel:{
		name:'铲子',
		desc:'挖掘工具。',
		require:{metal:5, wood:5},
		cost:30,
		show:true,
		type:['work']
	},
	pickaxe:{
		name:'铁镐',
		desc:'采矿用具。',
		require:{metal:5, wood:5},
		cost:30,
		show:true,
		type:['work']
	},
	hoe:{
		name:'锄头',
		desc:'主要用于开垦土地。',
		require:{metal:3, wood:5},
		cost:30,
		show:true,
		type:['work']
	},
	scalpel:{
		name:'手术刀',
		desc:'给自己动个手术。',
		require:{metal:2, part:2},
		cost:30,
		show:true,
		type:['work']
	},
	axe_2:{
		name:'合金斧',
		desc:'主要用于伐木的工具。',
		require:{alloy:3, wood:3, part:2},
		cost:30,
		tech:40,
		type:['work']
	},
	shovel_2:{
		name:'合金铲',
		desc:'挖掘工具。',
		require:{alloy:5, wood:5, part:2},
		cost:30,
		tech:40,
		type:['work']
	},
	pickaxe_2:{
		name:'合金镐',
		desc:'采矿用具。',
		require:{alloy:5, wood:5, part:1},
		cost:30,
		tech:40,
		type:['work']
	},
	hoe_2:{
		name:'合金锄',
		desc:'主要用于开垦土地。',
		require:{alloy:3, wood:5, part:1},
		cost:30,
		tech:40,
		type:['work']
	},
	part:{
		name:'零件',
		desc:'用于制作工具的基础部件。',
		require:{metal:2},
		cost:2,
		show:true,
		type:['work']
	},
	leather:{
		name:'皮革',
		desc:'处理后的毛皮。',
		require:{fur:1},
		cost:10,
		tech:20,
		type:['work']
	},
	cloth:{
		name:'布',
		desc:'基础材料。',
		require:{fur:1},
		cost:10,
		tech:20,
		type:['work']
	},
	gunpowder:{
		name:'火药',
		desc:'制作子弹的重要材料。',
		require:{ore:1},
		cost:1,
		tech:30,
		type:['work']
	},
	rope:{
		name:'绳子',
		desc:'干草搓成的麻绳。',
		require:{hay:10},
		cost:5,
		show:true,
		type:['work']
	},
	leaRope:{
		name:'皮绳',
		desc:'用皮革制作的绳索。',
		require:{leather:10},
		cost:10,
		tech:20,
		type:['work']
	},
	cable:{
		name:'铁索',
		desc:'金属制造，更耐用。',
		require:{metal:15},
		cost:15,
		tech:30,
		type:['work']
	},
	bottle:{
		name:'瓶子',
		desc:'装载液体。',
		require:{glass:1},
		cost:2,
		show:true,
		type:['work']
	},
	jar:{
		name:'玻璃缸',
		desc:'普通的玻璃缸。',
		require:{glass:10},
		cost:20,
		tech:20,
		type:['work']
	},
	gasCan:{
		name:'气罐',
		desc:'存放气体的容器。',
		require:{metal:5},
		cost:5,
		tech:20,
		type:['work']
	},
	wire:{
		name:'电线',
		desc:'制作电子物品的重要材料。',
		require:{metal:1},
		cost:1,
		tech:20,
		type:['work']
	},
	eTube:{
		name:'电子管',
		desc:'制作电子物品的重要材料。',
		require:{glass:5, elecWaste:4},
		cost:30,
		tech:20,
		type:['work']
	},
	eTube_2:{
		name:'改良电子管',
		desc:'比电子管体积更小，性能更优秀。',
		require:{eTube:1, rareEarth:2},
		cost:30,
		tech:50,
		type:['work']
	},
	transistor:{
		name:'晶体管',
		desc:'重要的半导体元件。',
		require:{silicon:10, elecWaste:5},
		cost:30,
		tech:40,
		type:['work']
	},
	chip:{
		name:'芯片',
		desc:'制作高级电子物品的重要材料。',
		require:{silicon:5, elecWaste:15},
		cost:30,
		tech:40,
		type:['work']
	},
	emptyBattery:{
		name:'空白电池',
		desc:'未充能的电池。',
		require:{alloy:2},
		cost:10,
		tech:50,
		type:['work']
	},
	battery:{
		name:'能量电池',
		desc:'能量武器和科技设备的能源。',
		require:{emptyBattery:1, elecWaste:5},
		cost:5,
		tech:50,
		type:['work']
	},
	nucBattery:{
		name:'核电池',
		desc:'用于大功率机械的便携能源。',
		require:{emptyBattery:1, uranium:2},
		cost:10,
		tech:50,
		type:['work']
	},
	unlocker:{
		name:'开锁器',
		desc:'需要一定技术才能使用。',
		require:{part:5},
		cost:30,
		tech:30,
		type:['work']
	},
	eUnlocker:{
		name:'电子开锁器',
		desc:'高新技术，能破解更复杂的锁。',
		require:{part:20, eTube:5},
		cost:30,
		tech:50,
		type:['work']
	},
	radio:{
		name:'无线电台',
		desc:'听到别人的声音能让你不那么压抑，尽管对面不一定是人类。',
		require:{ore:2, part:15},
		cost:30,
		show:true,
		type:['work']
	},
	radar_1:{
		name:'感应器',
		desc:'帮助你提前发现敌人。（携带生效）',
		require:{part:30, eTube:4, chip:1},
		cost:60,
		tech:60,
		type:['work']
	},
	radar_2:{
		name:'红外雷达',
		desc:'帮助你提前发现敌人。（携带生效）',
		require:{part:40, transistor:4, chip:2},
		cost:120,
		tech:80,
		type:['work']
	},
	inviBoy:{
		name:'隐身小子',
		desc:'趁现在，往他们口袋里塞手雷！',
		require:{part:60, transistor:4, eTube_2:5, chip:2},
		cost:120,
		type:['lab']
	},
	nightVision:{
		name:'夜视仪',
		desc:'在夜间获取更大的距离优势。（携带生效）',
		require:{part:40, eTube:2, glass:8},
		cost:60,
		tech:60,
		type:['work']
	},
	//====武器====
	bullet:{
		name:'子弹',
		desc:'枪械的弹药。',
		require:{gunpowder:1, metal:1},
		cost:1,
		tech:35,
		type:['work']
	},
	bullet_2:{
		name:'破甲弹',
		desc:'可以击穿目标装甲的子弹。',
		require:{bullet:1, alloy:1},
		cost:2,
		tech:80,
		level:2,
		type:['work']
	},
	bullet_3:{
		name:'充能弹',
		desc:'提升暴击倍数，击中后释放电流麻痹目标，小概率让目标进入眩晕状态。',
		require:{bullet:1, alloy:2},
		cost:5,
		tech:120,
		level:3,
		type:['work']
	},
	arrow:{
		name:'箭',
		desc:'弓弩的弹药。',
		require:{wood:1},
		cost:1,
		show:true,
		type:['work', 'handwork']
	},
	poiArrow:{
		name:'毒箭',
		desc:'涂有毒药的箭。',
		require:{arrow:1, venom:1},
		cost:1,
		tech:25,
		type:['work', 'handwork']
	},
	bombArrow:{
		name:'爆破箭',
		desc:'附加了炸药的箭。',
		require:{arrow:1, gunpowder:1},
		cost:1,
		tech:35,
		type:['work']
	},
	acidArrow:{
		name:'腐蚀箭',
		desc:'从毒液中提取强酸性物质制造的箭矢，能降低敌人防御。（产量与毒液比例为3:2）',
		require:{arrow:3, venom:2},
		cost:1,
		tech:85,
		amount:3,
		type:['work']
	},
	alloyArrow:{
		name:'合金箭',
		desc:'短时间内提升暴击倍数，感知越高提升越大。',
		require:{alloy:1},
		cost:5,
		tech:125,
		type:['work']
	},
	knuckles_1:{
		name:'指虎',
		desc:'街头斗殴的常用武器。',
		require:{metal:5},
		cost:30,
		show:true,
		type:['work']
	},
	knuckles_2:{
		name:'带刺指虎',
		desc:'加装了尖刺，能打出更多的血花。',
		require:{knuckles_1:25, part:5, metal:5},
		cost:30,
		tech:20,
		type:['work']
	},
	dagger_1:{
		name:'匕首',
		desc:'普通的匕首。',
		require:{metal:2, wood:1},
		cost:30,
		show:true,
		type:['work']
	},
	dagger_2:{
		name:'战斗匕首',
		desc:'威力更强的军用匕首。',
		require:{dagger_1:25, alloy:4},
		cost:30,
		tech:25,
		level:1,
		type:['work']
	},
	dagger_3:{
		name:'淬毒匕首',
		desc:'这把匕首可是涂满了致命的毒药！',
		require:{dagger_1:25, venom:5},
		cost:30,
		tech:10,
		type:['work']
	},
	dagger_4:{
		name:'振动匕首',
		desc:'刀刃能进行高频振动，加强切割力。',
		require:{alloy:80, part:80, rareEarth:20},
		cost:120,
		level:3,
		type:['work']
	},
	dagger_4_design:{
		only:true,
		upgrade:'if(PLAYER_STATUS.tech.value >= 100){TOOL_DATA.dagger_4.show = true;}'
		+'else{TOOL_DATA.dagger_4.tech = 100;}',
		type:['work']
	},
	dagger_5:{
		name:'粒子刀',
		desc:'几乎能切开一切装甲。',
		require:{alloy:150, part:150, rareEarth:40},
		cost:120,
		level:4,
		type:['work']
	},
	boneSpear:{
		name:'骨矛',
		desc:'用骨头做的长矛。',
		require:{wood:6, bone:4},
		cost:30,
		show:true,
		type:['work']
	},
	spear:{
		name:'长矛',
		desc:'普通的长矛。',
		require:{wood:10, dagger_1:25},
		cost:30,
		show:true,
		type:['work']
	},
	bombSpear:{
		name:'爆炸矛',
		desc:'往前一扔，就能看到美妙的火花。',
		require:{spear:40, gas:1, gunpowder:1},
		cost:30,
		tech:25,
		level:1,
		type:['work']
	},
	knife:{
		name:'砍刀',
		desc:'普通的大砍刀。',
		require:{metal:6, wood:2},
		cost:30,
		show:true,
		type:['work']
	},
	bbqKnife:{
		name:'烤肉刀',
		desc:'加装了喷火器，肉切下来时就已经烤好了。',
		require:{knife:50, gasCan:4, rope:20},
		cost:30,
		tech:25,
		level:1,
		type:['work']
	},
	jack:{
		name:'开膛手',
		desc:'美味的鲜血……',
		require:{alloy:100, part:100, rareEarth:30},
		cost:120,
		level:3,
		type:['work']
	},
	lightSword:{
		name:'光剑',
		desc:'原力与你同在。',
		require:{alloy:100, part:200, crystal:80},
		cost:120,
		level:4,
		type:['work']
	},
	stick_1:{
		name:'木棒',
		desc:'普通的木棒。',
		require:{wood:5},
		cost:30,
		show:true,
		type:['work']
	},
	stick_2:{
		name:'狼牙棒',
		desc:'真的是用牙齿做的。',
		require:{stick_1:30, teeth:10},
		cost:30,
		tech:10,
		type:['work']
	},
	bat:{
		name:'棒球棍',
		desc:'不知道为什么，时常能把东西打出很远。',
		require:{stick_1:30, metal:20},
		cost:30,
		tech:25,
		level:1,
		type:['work']
	},
	hammer_1:{
		name:'铁锤',
		desc:'普通的铁锤。',
		require:{metal:30, part:10},
		cost:60,
		tech:25,
		type:['work']
	},
	hammer_2:{
		name:'动力锤',
		desc:'砸扁他们哈哈哈哈！',
		require:{alloy:200, metal:100, part:100},
		cost:120,
		level:3,
		type:['work']
	},
	hammer_2_design:{
		only:true,
		upgrade:'if(PLAYER_STATUS.tech.value >= 120){TOOL_DATA.hammer_2.show = true;}'
		+'else{TOOL_DATA.hammer_2.tech = 100;}',
		type:['work']
	},
	saw:{
		name:'电锯',
		desc:'普通的……电锯。',
		require:{metal:100, alloy:80, part:75},
		cost:120,
		tech:45,
		level:2,
		type:['work']
	},
	//====武器（远程）====
	bow_1:{
		name:'弓',
		desc:'普通的弓。',
		require:{wood:8, tendon:4},
		cost:30,
		show:true,
		type:['work']
	},
	bow_2:{
		name:'铁弓',
		desc:'铁制的弓，射程更远。',
		require:{metal:8, part:4, tendon:4},
		cost:40,
		tech:25,
		type:['work']
	},
	bow_3:{
		name:'合金弓',
		desc:'合金打造的弓，威力更大更精准。',
		require:{bow_2:200, alloy:10, metal:4},
		cost:60,
		tech:35,
		level:1,
		type:['work']
	},
	bow_4:{
		name:'复合弓',
		desc:'集合最强技术打造的弓。',
		require:{bow_3:300, alloy:50, part:75, tendon:20},
		cost:120,
		level:3,
		type:['work']
	},
	bow_4_design:{
		only:true,
		upgrade:'if(PLAYER_STATUS.tech.value >= 75){TOOL_DATA.bow_4.show = true;}'
		+'else{TOOL_DATA.bow_4.tech = 75;}',
		type:['work']
	},
	crossbow_1:{
		name:'手弩',
		desc:'小型的弩，可套在手臂上。',
		require:{wood:12, part:4, tendon:4},
		cost:40,
		show:true,
		type:['work']
	},
	crossbow_2:{
		name:'十字弩',
		desc:'普通的十字弩，射程更远更精准。',
		require:{wood:30, part:8, tendon:4},
		cost:60,
		tech:25,
		type:['work']
	},
	crossbow_3:{
		name:'连弩',
		desc:'采用连射技术，射速大幅提升。',
		require:{crossbow_2:200, part:15},
		cost:60,
		tech:35,
		level:1,
		type:['work']
	},
	spike:{
		name:'射钉枪',
		desc:'快速射出长钉，损失一定射程换取准确度。',
		require:{metal:100, alloy:60, part:60},
		cost:120,
		tech:85,
		level:2,
		type:['work']
	},
	flycutter_1:{
		name:'飞刀',
		desc:'普通的飞刀。',
		require:{metal:2},
		cost:5,
		show:true,
		type:['work']
	},
	flycutter_2:{
		name:'淬毒飞刀',
		desc:'涂有毒药的飞刀。',
		require:{flycutter_1:1, venom:1},
		cost:5,
		tech:15,
		type:['work']
	},
	pistol:{
		name:'手枪',
		desc:'普通的手枪。',
		require:{metal:12, part:18},
		cost:60,
		tech:35,
		level:2,
		type:['work']
	},
	gaussPistol:{
		name:'高斯手枪',
		desc:'使用电磁技术射出超高速子弹，充能时间较长。',
		require:{eTube_2:15, part:200, wire:50},
		cost:120,
		level:4,
		type:['work']
	},
	gaussPistol_design:{
		only:true,
		upgrade:'if(PLAYER_STATUS.tech.value >= 150){TOOL_DATA.gaussPistol.show = true;}'
		+'else{TOOL_DATA.gaussPistol.tech = 150;}',
		type:['work']
	},
	revolver:{
		name:'左轮',
		desc:'比普通手枪攻击力更强，后座力也更强。',
		require:{metal:10, part:15},
		cost:60,
		tech:35,
		level:2,
		type:['work']
	},
	rifle_1:{
		name:'猎枪',
		desc:'手工制造的猎枪。',
		require:{metal:20, wood:25, part:10},
		cost:90,
		tech:45,
		level:2,
		type:['work']
	},
	mauser:{
		name:'毛瑟枪',
		desc:'普通的毛瑟枪，威力不错。',
		require:{metal:25, wood:20, part:15},
		cost:90,
		tech:45,
		level:2,
		type:['work']
	},
	rifle_2:{
		name:'步枪',
		desc:'普通的半自动来福枪。',
		require:{rifle_1:200, part:50, alloy:15},
		cost:90,
		tech:55,
		level:2,
		type:['work']
	},
	gaussRifle:{
		name:'高斯步枪',
		desc:'采用高斯技术的步枪，威力强大。',
		require:{eTube_2:20, alloy:160, wire:75},
		cost:120,
		level:4,
		type:['work']
	},
	gaussRifle_design:{
		only:true,
		upgrade:'if(PLAYER_STATUS.tech.value >= 175){TOOL_DATA.gaussRifle.show = true;}'
		+'else{TOOL_DATA.gaussRifle.tech = 175;}',
		type:['work']
	},
	sniper_1:{
		name:'狙击枪',
		desc:'普通的狙击枪，射程较远，精准度高。',
		require:{metal:44, part:72, glass:5},
		cost:120,
		tech:65,
		level:3,
		type:['work']
	},
	sniper_2:{
		name:'反器材狙击',
		desc:'可击破装甲的强力狙击枪。',
		require:{sniper_1:200, alloy:30, part:100},
		cost:180,
		tech:85,
		level:3,
		type:['work']
	},
	machinegun_1:{
		name:'轻机枪',
		desc:'轻型机枪，射速极快。',
		require:{alloy:40, part:120, metal:60},
		cost:120,
		tech:75,
		level:3,
		type:['work']
	},
	machinegun_2:{
		name:'旋转机枪',
		desc:'多管旋转机枪，威力更强，射速稍慢。',
		require:{alloy:80, part:160, metal:120},
		cost:120,
		level:3,
		type:['work']
	},
	machinegun_2_design:{
		only:true,
		upgrade:'if(PLAYER_STATUS.tech.value >= 100){TOOL_DATA.machinegun_2.show = true;}'
		+'else{TOOL_DATA.machinegun_2.tech = 100;}',
		type:['work']
	},
	machinegun_3:{
		name:'复仇者',
		desc:'战车上使用的重型机炮，能扫平视野中的一切。',
		require:{alloy:120, part:240, metal:180},
		cost:120,
		level:4,
		type:['work']
	},
	shotgun_1:{
		name:'霰弹枪',
		desc:'普通的霰弹枪，近距离效果更好。',
		require:{rifle_1:200, part:80, alloy:10},
		cost:90,
		tech:55,
		level:2,
		type:['work']
	},
	shotgun_2:{
		name:'自动霰弹',
		desc:'可以连射的霰弹枪，准头依然不怎样。',
		require:{shotgun_1:200, part:100},
		cost:90,
		tech:75,
		level:3,
		type:['work']
	},
	flame:{
		name:'火焰喷射器',
		desc:'FFFFFFFFFFFFFFFFFFFF！',
		require:{alloy:60, part:150, gasCan:10},
		cost:120,
		tech:105,
		level:4,
		type:['work']
	},
	laser_1:{
		name:'激光手枪',
		desc:'Biu~Biu~Biu~',
		require:{eTube_2:30, part:160, elecWaste:200},
		cost:120,
		level:4,
		type:['work']
	},
	laser_2:{
		name:'激光步枪',
		desc:'Biu~Biu~Biu~Biu~Biu~',
		require:{eTube_2:50, part:200, elecWaste:240},
		cost:120,
		level:4,
		type:['work']
	},
	dagger_6:{
		require:{dagger_6_1:1, dagger_6_2:1, dagger_6_3:3},
		cost:240,
		type:['handwork']
	},
	hammer_3:{
		require:{hammer_3_1:4, hammer_3_2:1, hammer_3_3:1, hammer_3_4:1},
		cost:360,
		type:['handwork']
	},
	bow_5:{
		require:{bow_5_1:1, bow_5_2:1, bow_5_3:1, bow_5_4:5},
		cost:360,
		type:['handwork']
	},
	gaussSniper:{
		require:{gaussSniper_1:1, gaussSniper_2:2, gaussSniper_3:1, gaussSniper_4:4},
		cost:360,
		type:['handwork']
	},
	//====装备====
	boneArmor:{
		name:'骨甲',
		desc:'用骨头制作的简易装甲。',
		require:{bone:20},
		cost:30,
		show:true,
		type:['work']
	},
	jacket:{
		name:'皮夹克',
		desc:'普通的皮夹克。',
		require:{leather:25},
		cost:30,
		tech:20,
		type:['work']
	},
	dustcoat:{
		name:'皮风衣',
		desc:'长款皮风衣，穿起来还挺帅。',
		require:{leather:45},
		cost:30,
		tech:20,
		type:['work']
	},
	radCloth:{
		name:'防辐射服',
		desc:'穿上可以免受外界辐射，但无法消除食物中的辐射。',
		require:{metal:30, alloy:20},
		cost:120,
		tech:50,
		level:2,
		type:['work']
	},
	respirator:{
		name:'防毒面具',
		desc:'抵御毒气伤害。',
		require:{metal:10, part:10, gasCan:2},
		cost:120,
		tech:50,
		level:2,
		type:['work']
	},
	armor_1:{
		name:'皮甲',
		desc:'普通的皮甲，还算厚实，却依然防不住子弹。',
		require:{leather:60},
		cost:30,
		tech:20,
		type:['work']
	},
	armor_2:{
		name:'铁甲',
		desc:'坚固的铁甲，略嫌笨重。',
		require:{metal:50},
		cost:60,
		tech:25,
		level:1,
		type:['work']
	},
	armor_3:{
		name:'合金装甲',
		desc:'轻薄而坚固的合金装甲。',
		require:{alloy:50},
		cost:90,
		tech:45,
		level:2,
		type:['work']
	},
	armor_4:{
		name:'战斗装甲',
		desc:'专为战场环境设计的复合装甲。',
		require:{alloy:80, part:50, chip:1},
		cost:120,
		level:3,
		type:['work']
	},
	armor_4_design:{
		only:true,
		upgrade:'if(PLAYER_STATUS.tech.value >= 70){TOOL_DATA.armor_4.show = true;}'
		+'else{TOOL_DATA.armor_4.tech = 70;}',
		type:['work']
	},
	armor_lizard:{
		name:'蜥蜴皮甲',
		desc:'使用珍贵的蜥蜴皮制作的装甲。',
		require:{lizardLeather:2},
		cost:120,
		tech:140,
		level:4,
		type:['work']
	},
	shoe_4:{
		name:'火箭鞋',
		desc:'装有助推器的古怪鞋子。',
		require:{part:40, gasCan:2, leather:10},
		cost:120,
		level:3,
		type:['work']
	},
	shoe_4_design:{
		only:true,
		upgrade:'if(PLAYER_STATUS.tech.value >= 70){TOOL_DATA.shoe_4.show = true;}'
		+'else{TOOL_DATA.shoe_4.tech = 70;}',
		type:['work']
	},
	cyberEye:{
		name:'电子眼I型',
		desc:'自动分析目标行动，提升命中和闪避。',
		require:{part:100, chip:4, alloy:10},
		cost:30,
		tech:80,
		type:['lab']
	},
	cyberEye_2:{
		name:'电子眼II型',
		desc:'自动分析目标弱点，提升暴击和暴击倍数。',
		require:{part:100, chip:4, crystal:10},
		cost:30,
		tech:80,
		type:['lab']
	},
	//====药剂====
	research_2:{
		name:'研究',
		desc:'花费大量的时间在实验室中尝试新技术，提高技术水平。',
		recover:{tech:0.2},
		cost:60,
		show:true,
		type:['lab']
	},
	grease:{
		name:'油',
		desc:'从内脏中提取油脂。',
		require:{viscus:1},
		cost:10,
		show:true,
		amount:2,
		type:['lab']
	},
	grease_2:{
		name:'油',
		desc:'使用花生榨油。',
		require:{peanut:1},
		cost:5,
		turn:'grease',
		show:true,
		type:['lab']
	},
	manure_1:{
		name:'肥料',
		desc:'将粪便制作成肥料。',
		require:{shit:2},
		cost:5,
		show:true,
		turn:"manure",
		type:['lab']
	},
	manure_2:{
		name:'肥料',
		desc:'将尿液制作成肥料。',
		require:{urine:5},
		cost:5,
		show:true,
		turn:"manure",
		type:['lab']
	},
	manure_3:{
		name:'肥料',
		desc:'使用动物内脏制作肥料',
		require:{viscus:1},
		cost:5,
		show:true,
		turn:"manure",
		type:['lab']
	},
	venom_1:{
		name:'毒液',
		desc:'从毒刺中提取毒液。',
		require:{thorn:2, bottle:1},
		cost:5,
		tech:20,
		turn:"venom",
		type:['lab']
	},
	venom_2:{
		name:'毒液',
		desc:'使用蝎尾提取毒液，产量更高。',
		require:{telson:1, bottle:1},
		cost:5,
		tech:20,
		amount:2,
		turn:"venom",
		type:['lab']
	},
	antidote:{
		name:'解毒剂',
		desc:'解除中毒状态。',
		require:{herb:10, venom:1},
		cost:20,
		tech:20,
		type:['lab']
	},
	cure:{
		name:'治疗针',
		desc:'迅速恢复生命。',
		require:{herb:4, cleanWater:4, glass:2},
		cost:20,
		tech:25,
		type:['lab']
	},
	cure_2:{
		name:'再生药剂',
		desc:'1小时内，受到攻击时恢复相当于防御值20%的生命。',
		require:{lizardLeather_s:5, cleanWater:5, herb:4},
		cost:120,
		tech:120,
		type:['lab']
	},
	bandage:{
		name:'绷带',
		desc:'伤口止血。',
		require:{cloth:5},
		cost:10,
		show:true,
		type:['lab']
	},
	kit:{
		name:'抗生素',
		desc:'治疗各种疾病。',
		require:{herb:6},
		cost:10,
		tech:20,
		type:['lab']
	},
	radClear:{
		name:'辐尔康',
		desc:'降低身体辐射量。',
		require:{kit:2},
		cost:120,
		tech:30,
		type:['lab']
	},
	uranium:{
		name:'浓缩铀',
		desc:'从核废料中提炼出浓缩铀。',
		require:{nucWaste:5},
		cost:20,
		tech:20,
		type:['lab']
	},
	plutonium:{
		name:'浓缩钚',
		desc:'放射性物质，谨慎携带。',
		require:{nucWaste:10},
		cost:20,
		tech:100,
		type:['lab']
	},
	dope:{
		name:'兴奋剂',
		desc:'在1小时内临时增加20%攻击力。',
		require:{herb:5, thorn:2},
		cost:60,
		tech:30,
		type:['lab']
	},
	energyDrug:{
		name:'咖啡因',
		desc:'每2分钟恢复4点精力，持续8分钟。',
		require:{herb:3, peanut:2, cleanWater:1},
		cost:60,
		tech:90,
		type:['lab']
	},
	mentote:{
		name:'曼妥特',
		desc:'在1小时内临时提升2点感知。',
		require:{herb:5, larva:2},
		cost:60,
		tech:30,
		type:['lab']
	},
	mise:{
		name:'迷思',
		desc:'在1小时内临时提升2点灵巧。',
		require:{herb:5, cactus:2},
		cost:60,
		tech:30,
		type:['lab']
	},
	steroid:{
		name:'类固醇',
		desc:'在1小时内临时提升2点体质。',
		require:{herb:5, bone:2},
		cost:60,
		tech:30,
		type:['lab']
	}
};

var CROP_DATA = {};
var CROP_DATA_INIT = {
	patato:{
		name:'土豆',
		require:{patato:5, manure:2, water:5},
		get:{patato:30},
		refresh:2000,
		energy:2
	},
	peanut:{
		name:'花生',
		require:{peanut:5, manure:4, water:8},
		get:{peanut:25},
		refresh:2200,
		energy:2
	},
	cactus:{
		name:'仙人掌',
		require:{cactus:5, manure:3, water:2},
		get:{cactus:30},
		refresh:2000,
		energy:2
	},
	hippophae:{
		name:'沙棘果',
		require:{seed:15, manure:4, water:5},
		get:{hippophae:35},
		refresh:1800,
		energy:2
	},
	greens:{
		name:'蔬菜',
		require:{seed:10, manure:7, water:10},
		get:{greens:25},
		refresh:1440,
		energy:2
	},
	herb:{
		name:'草药',
		require:{seed:10, manure:4, water:10},
		get:{herb:28},
		refresh:1800,
		energy:2
	},
	hay:{
		name:'草',
		require:{seed:10, manure:4, water:2},
		get:{hay:40},
		refresh:1440,
		energy:2
	},
	wood:{
		name:'树',
		require:{wood:5, manure:5, water:16},
		get:{wood:80},
		refresh:3600,
		energy:6
	}
};