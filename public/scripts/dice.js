class AttackW {
    constructor(name, aRBonus, damage) {
        this.name = name;
        this.aRBonus = aRBonus;
        this.damage = damage;
    }
}

class Damage{
    constructor(rollN,rollS,bonus,type){
        this.rollN = rollN;
        this.rollS = rollS;
        this.bonus = bonus;
        this.type = type;
    }
}

function d(diceNum = [1],diceS = [20]){
    var num = diceNum.length;
    var sum = 0;
    for(var i = 0;i < num;i++){
        for(var j = 0;j < diceNum[i];j++)
            sum += Math.floor(Math.random() * diceS[i]) + 1;
    }
    return sum;
}

function damageD(damage){
    var diceNum = damage.rollN;
    var diceS = damage.rollS;
    var num = diceNum.length;
    var sum = 0;
    for(var i = 0;i < num;i++){
        for(var j = 0;j < diceNum[i];j++)
            sum += Math.floor(Math.random() * diceS[i]) + 1;
    }
    return sum;
}

function attackRoll(idN,idAR,idD,attack,criticalNum = 20){
    document.getElementById(idN).innerHTML = attack.name;
    var aRNum = d();
    var criticalFlag = false;
    if(aRNum >= criticalNum) criticalFlag = true;

    document.getElementById(idAR).innerHTML = "命中：" + parseInt(aRNum) + '+' + parseInt(attack.aRBonus) + '=' + parseInt(aRNum + attack.aRBonus);

    document.getElementById(idD).innerHTML = "伤害："; 
    var dNum = attack.damage.length;
    for(var i = 0;i < dNum;i++){
        if(aRNum == 1) {
            document.getElementById(idD).innerHTML += "×";
            continue;
        }
        document.getElementById(idD).innerHTML += damageRoll(attack.damage[i],i == 0 && criticalFlag) + '<br>   ';
    }
}

function damageRoll(damage,criticalFlag = 0){
    if(criticalFlag){
        var d1 = damageD(damage);
        var d2 = damageD(damage);
        return parseInt(d1) + '+' + parseInt(d2) + '+' + parseInt(damage.bonus) + '=' + parseInt(d1 + d2 + damage.bonus) + "点" + damage.type + "伤害";
    }    
    else{
        var d1 = damageD(damage);
        return parseInt(d1) + '+' + parseInt(damage.bonus) + '=' + parseInt(d1 + damage.bonus) + "点" + damage.type + "伤害";
    }
}

/*  瑞克塔维欧
    不死生物屠杀者。不死生物受到额外10（3d6）的该武器种类伤害。
    多重攻击Undead。用剑杖攻击两次。
    剑杖Sword Cane。近战武器攻击：命中+4。伤害：4（1d6+1）钝击伤害（木杖）或者穿刺伤害（银剑）
*/
function rictavio(){
    var swordCaneD = [new Damage([1],[6],1,"钝击或穿刺"),new Damage([3],[6],0,"额外")];
    var swordCane = new AttackW("剑杖",8,swordCaneD);
    attackRoll("rictavio_N1","rictavio_AR1","rictavio_D1",swordCane);
    attackRoll("rictavio_N2","rictavio_AR2","rictavio_D2",swordCane);
}

/*  诺玟·安多米尔
    多重攻击Multiattack。三次攻击：两次用她的+1 刺剑，一次用她的+1 手斧或银质短剑。
    +1 刺剑Rapier。近战武器攻击：命中+8。伤害：9（1d8+5）穿刺伤害。
    +1 手斧Handaxe。近战或远程武器攻击：命中+6。伤害：6（1d6+3）挥砍伤害。
    银质短剑Silvered Shortsword。近战武器攻击：命中+7。伤害：7（1d6+4）穿刺伤害。
*/
function NerwenUndomiel(mode){
    var rapierD = [new Damage([1],[8],5,"穿刺")];
    var rapier = new AttackW("+1刺剑",8,rapierD);
    var handaxeD = [new Damage([1],[6],3,"挥砍")]
    var handaxe = new AttackW("+1手斧",6,handaxeD);
    var shortswordamageD = [new Damage([1],[6],4,"穿刺")];
    var shortsword = new AttackW("银质短剑",7,shortswordamageD);

    attackRoll("NU_N1","NU_AR1","NU_D1",rapier);
    attackRoll("NU_N2","NU_AR2","NU_D2",rapier);
    switch(mode){
        case 1:
            attackRoll("NU_N3","NU_AR3","NU_D3",handaxe);
            break;
        case 2:
            attackRoll("NU_N3","NU_AR3","NU_D3",shortsword);
            break;
    }
}

//活化战斗扫帚
function animatedBroom(){
    diceNum = [1];
    diceS = [4];
    attackRoll("animatedBroom_AR1","animatedBroom_D1","帚柄猛击",5,diceNum,diceS,3,"钝击");
    attackRoll("animatedBroom_AR2","animatedBroom_D2","帚柄猛击",5,diceNum,diceS,3,"钝击");
}

//活化盔甲
function animatedArmor(){
    diceNum = [1];
    diceS = [6];
    attackRoll("animatedArmor_AR1","animatedArmor_D1","猛击",4,diceNum,diceS,2,"钝击");
    attackRoll("animatedArmor_AR2","animatedArmor_D2","猛击",4,diceNum,diceS,2,"钝击");
}

/*暴徒
多重攻击Multiattack。两次近战攻击。
硬头锤Mace。近战武器攻击：命中+4。伤害：5（1d6+2）的钝击伤害。
重弩Heavy Crossbow。远程武器攻击：命中+2。伤害：5（1d10）的穿刺伤害。
*/
function thug(){
    var maceD = [new Damage([1],[6],2,"钝击")];
    var mace = new AttackW("硬头锤",4,maceD);
    attackRoll("thug_N1","thugAR1","thugD1",mace);
    attackRoll("thug_N2","thugAR2","thugD2",mace);
}

//密探
function spy(){
    diceNum = [1];
    diceS = [6];
    attackRoll("spyAR1","spyD1","短剑",4,diceNum,diceS,2,"穿刺");
    attackRoll("spyAR2","spyD2","短剑",4,diceNum,diceS,2,"穿刺");
}

//食人魔僵尸
function ogreZombie(){
    diceNum = [2];
    diceS = [8];
    attackRoll("ogreZombieAR1","ogreZombieD1","钉头锤",6,diceNum,diceS,4,"钝击");
}

/*  施特拉德僵尸
    多重攻击Multiattack。三次攻击：一次啃咬，两次爪击
    啃咬Bite。近战武器攻击：命中+3。伤害：3（1d4+1）穿刺伤害。
    爪击Claw。近战武器攻击：命中+3。伤害：4（1d6+1）挥砍伤害。
*/
function strahdZombie(){
    var biteD = [new Damage([1],[4],1,"穿刺")];
    var bite = new AttackW("啃咬",3,biteD);
    var clawD = [new Damage([1],[6],1,"挥砍")];
    var claw = new AttackW("爪击",3,clawD);
    attackRoll("strahdZombie_N1","strahdZombieAR1","strahdZombieD1",bite);
    attackRoll("strahdZombie_N2","strahdZombieAR2","strahdZombieD2",claw);
    attackRoll("strahdZombie_N3","strahdZombieAR3","strahdZombieD3",claw);
}

/*  吸血鬼衍体
多重攻击Multiattack。两次攻击，其中只能有一次啃咬攻击。
爪击Claws。近战武器攻击：命中+6。伤害：8（2d4+3）的挥砍伤害。
啃咬Bite。近战武器攻击：命中+6。伤害：6（1d6+3）的穿刺伤害，外加7（2d6）的黯蚀伤害。
*/
function vampireSpawn(){
    var biteD = [new Damage([1],[6],3,"穿刺"),new Damage([2],[6],0,"黯蚀")];
    var bite = new AttackW("啃咬",6,biteD);
    attackRoll("vampireSpawn_N1","vampireSpawnAR1","vampireSpawnD1",bite);
    attackRoll("vampireSpawn_N2","vampireSpawnAR2","vampireSpawnD2",bite);
}

/*  狼人
    多重攻击（仅类人与半人形态）。两次攻击：一次啃咬攻击，一次爪击攻击或矛攻击。
    啃咬Bite（仅狼与半人形态）。近战武器攻击：命中+4。伤害：6（1d8+2）的穿刺伤害。如果目标是类人生物，则目标必须成功通过一次DC 12的体质豁免，否则将遭受狼人兽化诅咒。
    爪击Claw（仅半人形态）。近战武器攻击：命中+4。伤害：7（2d4+2）的挥砍伤害。
    矛Spear（仅类人形态）。近战或远程武器攻击：命中+4。伤害：5（1d6+2）的穿刺伤害，或使用双手做近战攻击时6（1d8+2）的穿刺伤害。
*/
function wereWolf(){
    var biteD = [new Damage([1],[8],2,"穿刺")];
    var bite = new AttackW("啃咬",4,biteD);
    var clawD = [new Damage([2],[4],2,"挥砍")];
    var claw = new AttackW("爪击",4,clawD);
    attackRoll("wereWolf_N1","wereWolfAR1","wereWolfD1",bite);
    attackRoll("wereWolf_N2","wereWolfAR2","wereWolfD2",claw);
}