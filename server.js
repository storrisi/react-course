var express = require('express');

var path = require('path');
var bodyParser = require('body-parser');
var url = require('url');
var app = express();

var sampleArray = [{"id":"7e617013-a789-4be3-86b3-d451aaf18845","first_name":"Hamilton","last_name":"Escalero","birth_date":"10/25/1971","credit_card":"344061003919575","iban":"ME87 2896 5417 2304 4031 72","balance":"58651.14","currency":"CNY","credit_card_type":"americanexpress"},
                    {"id":"7095d4a2-5f13-4274-896c-ddc768791d5c","first_name":"Sonny","last_name":"Patullo","birth_date":"05/31/1935","credit_card":"3546272198514150","iban":"BG62 SNCJ 0533 92KS 5ZOT QL","balance":"27637.24","currency":"VND","credit_card_type":"jcb"},
                    {"id":"4a509a38-699f-4012-b2e1-1da21c679ae4","first_name":"Elmore","last_name":"Peckham","birth_date":"01/26/1941","credit_card":"56022592108394414","iban":"FR46 8484 4194 06JH FHOD TTKR Y02","balance":"65439.48","currency":"PHP","credit_card_type":"china-unionpay"},
                    {"id":"15f81099-e3df-48d3-996f-c2ae2852050d","first_name":"Juliana","last_name":"Evill","birth_date":"12/19/1993","credit_card":"3566858927393539","iban":"BH09 AKMF YJI4 UGXA L4RB BH","balance":"51100.46","currency":"BRL","credit_card_type":"jcb"},
                    {"id":"6a1272a8-f2d2-4529-8f83-0cda4ecb5c37","first_name":"Lexine","last_name":"Petto","birth_date":"07/10/1989","credit_card":"4844690312434269","iban":"LB98 9524 ZTFC FGGE UVK8 5JU6 MRDP","balance":"39638.19","currency":"SEK","credit_card_type":"visa-electron"},
                    {"id":"dbc24e4f-991a-4fa0-aebc-a389f53597c0","first_name":"Ryon","last_name":"Murtell","birth_date":"09/17/1996","credit_card":"5610427838127330982","iban":"GB89 CBZM 0622 4786 2880 82","balance":"97257.86","currency":"CNY","credit_card_type":"china-unionpay"},
                    {"id":"2ae6b369-124e-4455-8417-82504e938837","first_name":"Gerri","last_name":"Waterstone","birth_date":"04/06/1948","credit_card":"3582218901799153","iban":"FR15 4830 3733 92FH E3K2 IUTX Y74","balance":"29274.91","currency":"CNY","credit_card_type":"jcb"},
                    {"id":"e90f2666-c0c9-49fe-ae55-3584e5842aab","first_name":"Abby","last_name":"Garshore","birth_date":"03/25/1994","credit_card":"5492421985866906","iban":"ES45 1789 3028 8384 5141 6934","balance":"13412.59","currency":"CNY","credit_card_type":"mastercard"},
                    {"id":"ba782e9d-8e81-4d29-be74-9d1514bb9487","first_name":"Maurise","last_name":"Morlon","birth_date":"03/12/1949","credit_card":"372301562470601","iban":"NO48 5219 5989 885","balance":"28940.98","currency":"COP","credit_card_type":"americanexpress"},
                    {"id":"bf970165-a387-47c8-8cb8-d414b3f1a4e5","first_name":"Benjie","last_name":"Jaffrey","birth_date":"04/28/1981","credit_card":"3563755801949423","iban":"BG24 OETC 1667 718O RVUP M9","balance":"91858.88","currency":"CNY","credit_card_type":"jcb"},
                    {"id":"02e30b25-00a5-4bac-9a4f-27e8e5a1ad09","first_name":"Phineas","last_name":"Reach","birth_date":"02/06/1943","credit_card":"6759626576380485944","iban":"MD80 PXUN MK2V FSWH VV7C UYPT","balance":"10659.20","currency":"CNY","credit_card_type":"maestro"},
                    {"id":"f63ad878-8be0-473d-9525-3ebf9088e0c5","first_name":"Kathye","last_name":"Gaudon","birth_date":"10/28/1994","credit_card":"3530298857410180","iban":"AD10 7921 6693 G5N6 A8BX 3EJV","balance":"86624.70","currency":"BRL","credit_card_type":"jcb"},
                    {"id":"8be2f321-0fb3-46f1-b126-9b7e8d96223a","first_name":"Philly","last_name":"Haacker","birth_date":"06/20/1958","credit_card":"56105309724745477","iban":"DO32 UYEE 3725 5680 8671 4507 2763","balance":"14355.00","currency":"MYR","credit_card_type":"china-unionpay"},
                    {"id":"2f1ac261-76ee-4929-81b3-82564d9cbe74","first_name":"Jeanne","last_name":"Bails","birth_date":"11/26/1956","credit_card":"3583083631953473","iban":"NO63 0023 1469 036","balance":"31223.26","currency":"CNY","credit_card_type":"jcb"},
                    {"id":"973bad9c-d031-4e1b-8238-6df8144388d2","first_name":"Cherish","last_name":"Walch","birth_date":"07/25/1936","credit_card":"3578895736418418","iban":"IS62 1362 7565 4241 6939 5933 56","balance":"14373.63","currency":"EUR","credit_card_type":"jcb"},
                    {"id":"26c9e8a1-1152-4941-afc3-9696e571bdd4","first_name":"Ariel","last_name":"Meadmore","birth_date":"12/11/1932","credit_card":"4175006468531809","iban":"GE73 XZ12 4069 4036 6153 70","balance":"65983.67","currency":"EUR","credit_card_type":"visa-electron"},
                    {"id":"620c4d86-f2d7-4a30-b625-d2dbfd6eb52a","first_name":"Barbe","last_name":"Leyzell","birth_date":"01/23/1983","credit_card":"5437166908270516","iban":"VG22 VKRR 8090 6138 7648 7381","balance":"91146.43","currency":"IDR","credit_card_type":"diners-club-us-ca"},
                    {"id":"bbc48e5c-2e1c-4ca3-a3b1-c6da47d0d1cc","first_name":"Pietro","last_name":"Chatband","birth_date":"02/19/1973","credit_card":"3555852518304685","iban":"MT37 HFRP 9609 85SH 2WLR CHZX X6NV U9R","balance":"47364.89","currency":"RUB","credit_card_type":"jcb"},
                    {"id":"acf9d6c0-dfc9-425b-89ce-a763a9673ee3","first_name":"Keefer","last_name":"Duchenne","birth_date":"02/07/1930","credit_card":"3533803317073556","iban":"AE34 3948 4354 4470 5529 013","balance":"89691.77","currency":"CNY","credit_card_type":"jcb"},
                    {"id":"0cb29a37-59ec-4fed-b538-138ba9214ed3","first_name":"Tori","last_name":"Ferrotti","birth_date":"12/02/1973","credit_card":"06042335457223946","iban":"MC75 4884 4074 78T9 SUWR C3QE W27","balance":"21446.33","currency":"EUR","credit_card_type":"maestro"},
                    {"id":"e0dd76e7-1d79-43e4-9c55-2e9db3f088e3","first_name":"Raymond","last_name":"Stebbings","birth_date":"08/25/1977","credit_card":"201507705086289","iban":"MK45 521P 7CU2 MIBA P04","balance":"61820.11","currency":"PHP","credit_card_type":"diners-club-enroute"},
                    {"id":"535c4804-9e09-4bb8-a163-67eb58c644ac","first_name":"Felice","last_name":"Potteridge","birth_date":"03/12/1976","credit_card":"36082700846914","iban":"BA10 5446 1636 2107 9267","balance":"9271.03","currency":"AZN","credit_card_type":"diners-club-international"},
                    {"id":"06993f74-6537-4218-99b7-1df874d68de3","first_name":"Daryl","last_name":"Hiskey","birth_date":"02/02/1941","credit_card":"3528888060001117","iban":"CZ70 5978 2527 2640 1424 1595","balance":"48560.36","currency":"CNY","credit_card_type":"jcb"},
                    {"id":"c915f579-2f2b-41a0-921f-3094bfce1432","first_name":"Danella","last_name":"Coale","birth_date":"08/21/1931","credit_card":"67710475292233081","iban":"IS69 3269 2471 0591 2712 5265 91","balance":"84119.97","currency":"CNY","credit_card_type":"laser"},
                    {"id":"e80ae774-c1c9-44b9-aaad-597654ffc7dc","first_name":"Julian","last_name":"Muirhead","birth_date":"11/30/1977","credit_card":"4041373447447529","iban":"DO56 CYOV 6539 0409 8072 2163 1500","balance":"93244.05","currency":"NGN","credit_card_type":"visa"},
                    {"id":"065047bb-3472-410a-aebc-83395b2f5a9a","first_name":"Janice","last_name":"Milsom","birth_date":"01/08/1982","credit_card":"3558468321183641","iban":"LU95 095R GR9J DFWX SPP7","balance":"69711.23","currency":"RUB","credit_card_type":"jcb"},
                    {"id":"dd3641e0-c23e-4373-bd07-874bf6428020","first_name":"Erhart","last_name":"Murdy","birth_date":"12/31/1975","credit_card":"3566043653996892","iban":"TR77 0236 20PK 00J4 RMH8 W9UB ZY","balance":"62806.77","currency":"EUR","credit_card_type":"jcb"},
                    {"id":"2f0f605a-f1ce-470e-812c-e55cbece34ce","first_name":"Davon","last_name":"Pesek","birth_date":"12/02/1971","credit_card":"5602249454483557","iban":"PS78 UOYX CCGZ HRRW EILK H3BH HGOD I","balance":"99646.69","currency":"UAH","credit_card_type":"china-unionpay"},
                    {"id":"44ccf293-59d8-459f-9a99-15207a51fd19","first_name":"Farlie","last_name":"Brantl","birth_date":"08/04/1938","credit_card":"3567854727889635","iban":"FR77 0689 6007 100Q QCK5 GMJK D08","balance":"64769.33","currency":"CNY","credit_card_type":"jcb"},
                    {"id":"22abb1b9-4c7a-4d7f-82da-ab3f06746ee7","first_name":"Patsy","last_name":"Ilott","birth_date":"11/05/1969","credit_card":"30067079764901","iban":"FR24 6272 1733 75KL PJV3 AIWF C35","balance":"13698.69","currency":"BGN","credit_card_type":"diners-club-carte-blanche"},
                    {"id":"230e5ff0-1b1c-48bb-9bc0-f67432d9fca7","first_name":"Jess","last_name":"Sheddan","birth_date":"01/16/1935","credit_card":"36467077175866","iban":"FR18 9342 0175 90CP F9IK W4SF L54","balance":"75364.24","currency":"CNY","credit_card_type":"diners-club-international"},
                    {"id":"25f8e7d9-9908-4b0e-a430-a2a09dc6f15f","first_name":"Dasha","last_name":"Finnimore","birth_date":"05/07/1962","credit_card":"3551758410840367","iban":"RS78 8287 8441 3163 5145 51","balance":"56453.78","currency":"MKD","credit_card_type":"jcb"},
                    {"id":"f8ba677f-6c4c-48cb-838b-8c97d54807bd","first_name":"Jamil","last_name":"Murby","birth_date":"09/18/1942","credit_card":"3536809971890208","iban":"PT75 9749 5785 8441 6256 6017 4","balance":"4610.30","currency":"BRL","credit_card_type":"jcb"},
                    {"id":"a403e6c7-c0ae-4d25-83b0-c8d747b9ee46","first_name":"Robbi","last_name":"Pimerick","birth_date":"03/29/1975","credit_card":"0604407329077512","iban":"PS67 VEQQ QMHE NH87 BWLN L84N ZBJJ C","balance":"64143.00","currency":"PEN","credit_card_type":"maestro"},
                    {"id":"edaa6c5b-cf83-439c-8435-36190dfaaec1","first_name":"Laurel","last_name":"Chivrall","birth_date":"04/09/1966","credit_card":"6759055408611963293","iban":"BR31 6484 3459 2335 5257 3626 062A J","balance":"1404.51","currency":"JPY","credit_card_type":"switch"},
                    {"id":"4e861ae0-04cb-4f85-a531-f7e3084d73cf","first_name":"Margret","last_name":"Idale","birth_date":"07/20/1941","credit_card":"6763223975275104348","iban":"FR89 1886 3589 762B 7SEH PPDW 536","balance":"52121.21","currency":"BRL","credit_card_type":"maestro"},
                    {"id":"1f241827-47bc-4645-b498-1c715e44ab54","first_name":"Marylin","last_name":"Smye","birth_date":"11/05/1954","credit_card":"3576365965177095","iban":"AD91 6227 0867 D8VC XCXC FXNR","balance":"73745.98","currency":"IDR","credit_card_type":"jcb"},
                    {"id":"50643574-9725-4ec0-8955-a16170973695","first_name":"Jessey","last_name":"Ferrai","birth_date":"04/23/1947","credit_card":"3582311361548515","iban":"MK11 9851 RLVM AVC9 U84","balance":"46889.96","currency":"TND","credit_card_type":"jcb"},
                    {"id":"fac5d56c-c41a-447c-ab59-ce8ae94c5b7f","first_name":"Mindy","last_name":"O'Logan","birth_date":"04/03/1980","credit_card":"5602211052865502","iban":"FR17 6208 2696 249K J5BF R3OW R35","balance":"22053.29","currency":"PHP","credit_card_type":"bankcard"},
                    {"id":"02c3157b-6cbb-4a31-a859-937f3d5b69be","first_name":"Bail","last_name":"Luca","birth_date":"07/09/1952","credit_card":"5534012210900972","iban":"FR69 7913 3990 20A1 APQ9 Y83I 442","balance":"79417.90","currency":"CNY","credit_card_type":"mastercard"},
                    {"id":"28102bd9-779a-41b2-9b2c-5cfdf956b6c9","first_name":"Oralla","last_name":"Sunman","birth_date":"03/30/1977","credit_card":"3566571351720354","iban":"IE95 ZWGS 9257 9364 6880 00","balance":"53640.57","currency":"RUB","credit_card_type":"jcb"},
                    {"id":"a23edcae-c81e-4321-848c-ebca3c641460","first_name":"Raven","last_name":"Heinreich","birth_date":"03/18/1953","credit_card":"3547807149033732","iban":"CR60 3662 7698 5540 8353 8","balance":"10228.89","currency":"EUR","credit_card_type":"jcb"},
                    {"id":"7603e190-3583-4dff-9c52-dbeb682c2afa","first_name":"Merrilee","last_name":"Inkpin","birth_date":"05/21/1967","credit_card":"3547079784864744","iban":"LV17 MOFO FV7W GJQ0 OJ4A P","balance":"80457.08","currency":"IDR","credit_card_type":"jcb"},
                    {"id":"ad1936d6-85c4-47a4-a936-e7c8cf8490c5","first_name":"Hynda","last_name":"Prendergast","birth_date":"07/01/1968","credit_card":"3567837805402025","iban":"SK07 6898 1149 7353 9717 7370","balance":"78824.03","currency":"CNY","credit_card_type":"jcb"},
                    {"id":"b655ca4d-396b-403f-bfa0-34457b63ee11","first_name":"Geraldine","last_name":"Abrahmson","birth_date":"09/07/1948","credit_card":"56022467250802094","iban":"FR52 1896 1251 87TC XQUT CWLG O33","balance":"48099.91","currency":"CNY","credit_card_type":"china-unionpay"},
                    {"id":"f9fa292c-a4e7-41c4-b467-1752e96b079e","first_name":"Twila","last_name":"Greenwell","birth_date":"07/01/1972","credit_card":"3535473309120985","iban":"PK82 BILR 4UVA YQ7N ATK0 JETB","balance":"46194.69","currency":"SOS","credit_card_type":"jcb"},
                    {"id":"d8908e34-5f0e-48b1-80ac-0c9d5c691ba8","first_name":"Margit","last_name":"Ockleshaw","birth_date":"04/20/1943","credit_card":"201541164993636","iban":"BR26 4311 4181 8939 4536 5226 993L M","balance":"87286.41","currency":"RUB","credit_card_type":"diners-club-enroute"},
                    {"id":"a8c748af-72ca-43cd-80de-6285abb90c57","first_name":"Dina","last_name":"Rens","birth_date":"02/26/1984","credit_card":"3571975002168728","iban":"BR54 7348 3237 4297 4857 6021 171V I","balance":"43126.04","currency":"IDR","credit_card_type":"jcb"},
                    {"id":"c1c55981-7a42-4e36-ac21-e71b9766b9a3","first_name":"Faye","last_name":"Dei","birth_date":"01/01/1933","credit_card":"30231428425271","iban":"BE33 2428 4502 8990","balance":"80852.41","currency":"CNY","credit_card_type":"diners-club-carte-blanche"},
                    {"id":"77e15d64-4c4c-415a-85de-ac47bb724fa9","first_name":"Huey","last_name":"Fullbrook","birth_date":"07/27/1977","credit_card":"4026526030271189","iban":"BR54 9692 2111 9357 7419 2760 867Z B","balance":"40369.33","currency":"ARS","credit_card_type":"visa-electron"}];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname));

/* GET customers */ 
app.get('/api/getCustomers', function(req,res) {
  res.json(sampleArray);
});

app.get('/api/getCustomer', function(req,res) {
  
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  console.log('this is single customer:', query.customer);
  var customer = sampleArray.find((elem) => {return elem.first_name === query.customer});
  //console.log('customer:', customer);
  res.json(customer);
});

app.post('/api/checkCCNo', function(req,res) {
  let ccNo = req.body.ccNo;
  console.log('ccNo', ccNo);
  let ccRegex = new RegExp('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$');
  let isValid = ccRegex.test(ccNo);
  //console.log('ccNo isValid', isValid);
  let response = {
    ccno: ccNo,
    isValid: isValid
  }
  res.json(response);
});

app.post('/api/checkIban', function(req,res) {
  let iban = req.body.iban;
  console.log('iban', iban);
  let ibanRegex = new RegExp('^[A-Z]{2}(?:\s*[0-9a-zA-Z]\s*){20}$');
  let isValid = ibanRegex.test(iban);
  //console.log('iban isValid', isValid);
  let response = {
    iban: iban,
    isValid: isValid
  }
  res.json(response);
});

/* GET home page. */
app.get('/*', function(req, res, next) {
  //Path to your main file
  res.status(200).sendFile(path.join(__dirname+'/index.html')); 
});

let port = 3000;
app.listen(port, function(){
  console.log('App is running and listening on port:', port);
});

module.exports = app;
