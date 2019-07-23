import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '@patternfly/react-core';
import { Grid, GridItem } from '@patternfly/react-core';
import Browseri from './images/browseri.svg';
import consolei from './images/consolei.svg';
import wSelcomei from './images/welcomei.svg';
import { Dropdown, DropdownToggle, DropdownItem, DropdownSeparator, DropdownPosition, DropdownDirection, KebabToggle, Card, CardHeader, CardBody } from '@patternfly/react-core';

class Admin extends Component {
    public state = {
        buildDate: '',
        login: false
    };

    public render() {
        const id = 'userID';
        if(this.state.buildDate===''){
            fetch("/pantheon/builddate.json?")
            .then(response => response.json())
            .then(responseJSON => {
                    this.setState({ buildDate: responseJSON.buildDate }, () => {
                        console.log('Build date: ' + this.state.buildDate)
                    })
            })
        }

        return (  
            <React.Fragment>
                {this.checkAuth()}
                {this.loginRedirect()}
              <Grid gutter="md">
                <GridItem span={12}/>
                <GridItem span={12}/>
                <GridItem span={12}/>
                <GridItem span={12}/>
                <GridItem span={12}/>
                <GridItem span={12}/>
                <GridItem span={12}/>
                <GridItem span={12}/>
                <GridItem span={12}/>
                <GridItem span={12}/>
                <GridItem span={12}/>
                <GridItem span={3} rowSpan={2}/>
                <GridItem span={2} rowSpan={2}>
                  <Card>
                    <CardHeader><Button isBlock={true} variant={"secondary"} onClick={this.browserLink()}><img src={Browseri} style={{height: "100px"}}/></Button></CardHeader>
                    <CardBody style={{fontSize: "16px"}}>Browser link</CardBody>
                  </Card>
                </GridItem>
                <GridItem span={2} rowSpan={2}>
                  <Card>
                    <CardHeader><Button isBlock={true} variant={"secondary"} onClick={this.consoleLink()}><svg height='100px' width='100px'  fill="#000000" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 -2 32 32" overflow="visible" enable-background="new 0 -2 32 32" xmlSpace="preserve"><path d="M31,0H7C6.447,0,6,0.447,6,1v2c0,0.553,0.447,1,1,1h24c0.553,0,1-0.447,1-1V1C32,0.447,31.553,0,31,0z"/><path d="M31,8H7C6.447,8,6,8.447,6,9v2c0,0.553,0.447,1,1,1h24c0.553,0,1-0.447,1-1V9C32,8.447,31.553,8,31,8z"/><path d="M31,16H7c-0.553,0-1,0.447-1,1v2c0,0.553,0.447,1,1,1h24c0.553,0,1-0.447,1-1v-2C32,16.447,31.553,16,31,16z"/><path d="M31,24H7c-0.553,0-1,0.447-1,1v2c0,0.553,0.447,1,1,1h24c0.553,0,1-0.447,1-1v-2C32,24.447,31.553,24,31,24z"/><path d="M3,0H1C0.447,0,0,0.447,0,1v2c0,0.553,0.447,1,1,1h2c0.553,0,1-0.447,1-1V1C4,0.447,3.553,0,3,0z"/><path d="M3,8H1C0.447,8,0,8.447,0,9v2c0,0.553,0.447,1,1,1h2c0.553,0,1-0.447,1-1V9C4,8.447,3.553,8,3,8z"/><path d="M3,16H1c-0.553,0-1,0.447-1,1v2c0,0.553,0.447,1,1,1h2c0.553,0,1-0.447,1-1v-2C4,16.447,3.553,16,3,16z"/><path d="M3,24H1c-0.553,0-1,0.447-1,1v2c0,0.553,0.447,1,1,1h2c0.553,0,1-0.447,1-1v-2C4,24.447,3.553,24,3,24z"/></svg></Button></CardHeader>
                    <CardBody style={{fontSize: "16px"}}>Web Console Link</CardBody>
                  </Card>
                </GridItem>
                <GridItem span={2} rowSpan={2}>
                  <Card>
                    <CardHeader><Button isBlock={true} variant={"secondary"} onClick={this.welcomeLink()}>
                      <svg version="1.1" height="100px" width="100px" fill="#000000"
	                      xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 440 224.5833282"
	                      style={{background:"new 0 0 440 224.5833282;"}} xmlSpace="preserve">
                        <g>
                          <path d="M107.0036621,35.9104156v108.2927246c0,12.9440918,4.7609253,19.4161377,14.2827759,19.4161377
                            c7.848999,0,10.8167114-3.0135498,14.0536499-9.1265869c-6.6171875-2.0109253-7.3447876-8.4906006-7.3447876-19.3530884V36.0937653
                            L107.0036621,35.9104156z"/>
                          <polygon points="149.5083618,91.0135651 158.1135254,91.0135651 158.1135254,162.3416901 178.7156372,162.3416901
                            178.7156372,74.129715 149.5083618,74.129715 	"/>
                          <path d="M176.8078003,60.4713287l0.1489868-0.1489258c4.6118774-4.6831665,4.6118774-12.2007446,0-16.8838501
                            c-2.1825562-2.263916-5.2029419-3.5264282-8.3474121-3.4890747c-3.1464233-0.0389404-6.1691895,1.2236938-8.3530884,3.4890747
                            c-4.6119385,4.6831055-4.6119385,12.2006836,0,16.8838501C164.7858276,64.9338531,172.1959839,65.0005035,176.8078003,60.4713287z"
                            />
                          <path d="M203.5401001,73.7630157v87.2781372h20.5333252V97.9687653c2.1747437-2.7008667,4.9483032-4.8584595,8.1010742-6.302124
                            c2.9888306-1.5745239,6.2995605-2.440918,9.6765747-2.5322876c6.5235596,0,11.2310181,1.71875,14.1223755,5.15625
                            s4.3274536,8.8649292,4.3083496,16.2822876v50.416687h20.5333252V107.513504
                            c0-11.133667-3.0421753-19.8114014-9.1265869-26.0333252c-6.0843506-6.2218628-14.3114624-9.3328247-24.6812134-9.3327637
                            c-10.9197998,0-19.1793823,3.246521-24.7786865,9.739563v-8.1239624H203.5401001z"/>
                          <path d="M88.7161255,220.5728912l-1.5869751-0.4182129H87.026062l-0.7161865-0.1948242
                            c-12.4953003-3.3629761-21.197876-6.7317505-25.838501-10.0031128c-1.5096436-1.0612793-2.8600464-2.3325806-4.010437-3.7755127
                            h-38.385437v-27.7578125c-6.2197266-1.7927856-12.2459106-4.1994019-17.989563-7.1843872v53.3442993h106.3447876
                            c-2.6583252-0.5270996-5.3338623-1.0828247-8.020813-1.6729126
                            C94.8635254,222.1083527,91.666687,221.3463287,88.7161255,220.5728912z"/>
                          <polygon points="169.5557861,176.4217072 169.5571899,176.4234161 169.5557861,176.4216461 	"/>
                          <path d="M255.2174683,199.6358185c16.1395874-1.8778687,33.644104-4.5061646,52.0357666-7.6353149
                            c-1.3699951-1.4502563-2.888855-1.9190063-4.4951782-1.7556152c-3.3214722,0.5824585-25.1556396,4.3288574-54.7825317,7.6119385
                            c-0.8415527,0.0933228-1.6903076,0.184021-2.543335,0.2770996c-0.237793,0.0270386-0.4784546,0.0490723-0.7120361,0.0737305
                            c-3.1115112,0.3366699-6.2971802,0.6615601-9.5540771,0.9797974c-0.7419434,0.0706177-1.4838867,0.1411743-2.2301025,0.2141724
                            c-0.015686,0.0021362-0.0313721,0.0042725-0.0427246,0.0040283l-5.9222412,10.4776611l5.9136963-10.4728394
                            c-2.979248,0.2820435-6.0026855,0.555603-9.0774536,0.8178711c-0.8530273,0.0730591-1.7175293,0.145813-2.5776978,0.2161255
                            c-3.8168335,0.3128662-7.6906738,0.6043091-11.6144409,0.8770752c-3.7571411,0.2590942-7.5543213,0.4871216-11.3856812,0.6943359
                            c-3.8314209,0.2072754-7.6871948,0.3813477-11.5643921,0.5273438c-3.942749,0.1494751-7.9013062,0.2610474-11.8571167,0.3375854
                            c-3.913147,0.0724487-7.8306274,0.1072388-11.732605,0.0997925c-1.4075317-0.0024414-2.8136597-0.0123901-4.2154541-0.0247192
                            c-2.4262085-0.0234985-4.8410645-0.0667725-7.2445679-0.1298218c-0.1286621-0.0004883-0.2561035-0.0083618-0.3875122-0.013916
                            l0.0014038-0.0025024c-3.7998047-0.1053467-7.5726318-0.2526855-11.3057861-0.4492188
                            c-3.9782104-0.2122803-7.9067993-0.4860229-11.7700806-0.8234253c-4.0100708-0.3483276-7.9491577-0.7702026-11.7973633-1.2702026
                            c-0.2237549-0.02771-0.4546509-0.0581055-0.6826782-0.0834351c-3.7912598-0.4986572-7.4915771-1.0754395-11.0895996-1.7300415
                            l-0.0021973,0.0040894c-7.6032104-1.3861694-14.7236938-3.132019-21.1891479-5.3011475
                            c2.1279297,0.6807861,8.817688,2.6174316,20.9359741,4.3963623c-3.8171997-6.1437988-10.355896-15.2053223-15.9436035-22.4527588
                            c-12.362854,3.8850098-14.793335,11.3858032-14.793335,11.3858032s-4.6921387,10.4387207,2.666748,15.4336548
                            c3.5687866,2.4260254,11.4515991,5.3502197,22.0678101,8.1646729l0.0020752-0.0038452
                            c0.7327271,0.194519,1.473999,0.3842163,2.2294922,0.5792236c2.848938,0.7225342,5.8787842,1.4367065,9.053833,2.1291504
                            c3.5785522,0.779541,7.3535767,1.5284424,11.2723389,2.243103c3.6208496,0.6551514,7.3740234,1.2757568,11.2167969,1.8457642
                            c3.2711792,0.4841919,6.616333,0.9399414,10.0125732,1.3468018c0.1259766,0.0153198,0.2518921,0.0307007,0.3778076,0.0460815
                            l-0.0015259,0.0026855c0.2537231,0.0309448,0.5045166,0.0567627,0.7581787,0.0877075
                            c3.6000366,0.4190674,7.256958,0.7993164,10.9492188,1.1127319c3.7293091,0.3192749,7.4896851,0.5740967,11.265564,0.7666016
                            c3.1859741,0.1638794,6.37323,0.2801514,9.5588379,0.34375c0.6467896,0.0098877,1.2822266,0.0195923,1.921875,0.0268555
                            c3.9904785,0.0445557,7.7810669-0.0257568,11.3776245-0.1807251c4.0736694-0.1765747,7.8977051-0.4666748,11.463501-0.845459
                            c2.3468628-0.246521,4.586731-0.5331421,6.7196655-0.8397827c1.8081665-0.2840576,3.6063232-0.5958862,5.3787231-0.9334106
                            c4.184082-0.7880859,8.2649536-1.7389526,12.2298584-2.8654785l0.0103149-0.0183105
                            c0.168457-0.0482788,0.3464966-0.0891724,0.5233154-0.142334c4.8243408-1.3973999,9.4682007-3.074646,13.8857422-5.0930176
                            c0.1549683-0.0741577,0.3114624-0.1356812,0.4664917-0.2097778c-1.9558105,4.40625-1.4591675,12.9672241-1.4379272,12.9351196
                            c3.1334839-8.0986328,6.8781128-15.0150757,12.2651978-18.7730713c1.8945312,2.3195801,3.2418823,6.2006226,4.2805176,10.9793701
                            c0.8770142-6.0879517-0.0166626-9.78302-0.4732056-11.1596069c2.4040527,3.7801514,6.9428711,6.569397,11.8400879,9.1965332
                            C260.0506592,207.8382721,256.5133667,203.4655304,255.2174683,199.6358185z"/>
                          <path d="M144.7636719,171.7106476c-0.3648682-0.048584-0.7311401-0.0895996-1.105957-0.1258545
                            c-0.5228882-0.0195923-1.0314941-0.0338745-1.53302-0.0454102c-2.2652588-0.0473633-4.2324219,0.0049438-5.9244385,0.1162109
                            c-0.8460083,0.0556641-1.6179199,0.1230469-2.3242188,0.2069702c-0.2805176,0.0311279-0.5539551,0.0648804-0.815918,0.098938
                            c-0.7831421,0.1072388-1.4680176,0.2192383-2.0587769,0.3384399c-0.8840332,0.1775513-1.5600586,0.3649902-2.0366821,0.5269165
                            c0.2996826,0.1522827,0.6195068,0.3401489,0.9550781,0.565918c2.3191528,1.5574951,5.4133301,4.7269897,7.5758057,7.4713745
                            c0.0343018,0.0408936,0.0643921,0.0841675,0.0986938,0.125061c0.211853,0.2756348,0.4223022,0.5587158,0.6369629,0.8393555
                            c-0.0528564-0.0438232-0.0999756-0.0775146-0.1485596-0.1237183l13.3178101,19.2263794
                            c0.079834,0.0018921,0.1596069,0.0037231,0.246521,0.0082397c0.5214233,0.007019,1.0471191,0.0116577,1.5799561,0.0189819
                            c1.588501,0.0140991,3.2040405,0.0263672,4.8551636,0.0319824c1.7850342,0.0036621,3.6027832-0.0045166,5.4603882-0.0217285
                            c0.9359131-0.0059204,1.87323-0.0193481,2.8291016-0.0298462c2.8533325-0.0368652,5.7877808-0.0993652,8.8062134-0.1824951
                            c3.7092896-0.1047974,7.5466309-0.2416992,11.5106201-0.4232788c3.7788086-0.1708374,7.6715088-0.3791504,11.682251-0.6273804
                            c3.8057251-0.2328491,7.7180786-0.5058594,11.7357788-0.8115845c3.5847168-0.2755737,7.2476807-0.5819092,11.0045166-0.9212036
                            c0.182312-0.0158691,0.364563-0.0316772,0.5440063-0.0526123c3.7297974-0.3374023,7.5463867-0.7103882,11.4454346-1.1165771
                            c0.0878296-0.0101929,0.1754761-0.0203247,0.2593994-0.0283203l0.0012207,0.00177
                            c0.5710449-0.0544434,1.1392822-0.1140137,1.711731-0.1759644c3.0360718-0.3208618,6.1176758-0.6607056,9.2575684-1.0267944
                            c0.0469971-0.0064087,0.0897217-0.010437,0.1367188-0.0169067c0.4442749-0.0498657,0.8857422-0.1048584,1.3300171-0.1547241
                            c2.114624-0.2493896,4.007019-0.4938965,8.3144531-1.0435181c-0.4276733-2.8597412,0.8770752-6.0879517,2.559021-9.3952026
                            c-2.6790771,1.7602539-4.520752,4.6151733-5.0756836,8.364502c-6.1071167-11.843689-14.208374-20.4450684-24.243042-21.5917969
                            c-0.8964233-0.1034546-1.7998047-0.149353-2.7271118-0.1281738c3.8240967,0.9355469,6.5291748,3.2463379,9.3629761,8.8735962
                            c-7.5859985-6.3536987-12.7802124-8.7595825-19.6227417-9.6119995c-1.6218872-0.2028809-3.3361206-0.3201904-5.1982422-0.3807983
                            c10.0649414,3.6213379,16.4102783,10.8161011,19.9569702,20.1668701l0.0119019,0.0171509
                            c0.0489502,0.1324463,0.1068726,0.2652588,0.1548462,0.3977661c-5.1646729-7.2651978-15.802063-14.7897949-25.5266724-18.0473022
                            c-4.4815063-1.5021362-9.2971191-2.4405518-14.5496826-2.857666c-3.9102173-0.3109741-8.0615845-0.331665-12.5010986-0.0758667
                            c-3.8798218,0.2211304-7.9768677,0.6453247-12.3224487,1.2767944c1.7855225,1.3295288,3.5083008,3.0361328,5.1737671,5.0497437
                            c0.2890625,0.3525391,0.5838013,0.715271,0.8729248,1.0878906s0.5768433,0.7527466,0.8588867,1.1427612
                            c-0.0028687-0.005127-0.0100098-0.0077515-0.0128784-0.0128784c-0.008667-0.0079956-0.0175781-0.0150757-0.0262451-0.0230713
                            c-0.111084-0.1531982-0.2254028-0.2993164-0.3379517-0.449585c-0.1629639-0.2183228-0.3252563-0.4396973-0.4902954-0.6524048
                            c-0.2886353-0.3720093-0.5759888-0.7315063-0.871521-1.0861816c0.5509033,0.7019043,1.1119385,1.4315186,1.687561,2.1774902
                            c-6.3775024-5.857605-13.4185791-7.8567505-20.7655029-8.0540161c2.1528931,1.2828979,5.3108521,3.559021,8.0750732,6.8612671
                            c0.3776855,0.4498291,0.7398071,0.921875,1.0962524,1.4038696c0.0916138,0.1224365,0.1803589,0.2397461,0.2648315,0.3594971
                            c-0.0028687-0.0050659-0.0071411-0.0026855-0.0100098-0.0077515c0,0-0.0023193-0.0003052-0.00354-0.0012817
                            c-0.0838013-0.1182251-0.1720581-0.2286987-0.2526245-0.3430176c-0.359314-0.4869995-0.725708-0.956665-1.0963135-1.4038696
                            c0.4320068,0.5687256,0.8781128,1.1431274,1.3256836,1.729126c-2.2819824-1.9945679-4.4470215-3.5440063-6.6331177-4.7141113
                            c-0.4681396-0.2514648-0.9390869-0.487915-1.4142456-0.7019043c-0.7206421-0.3299561-1.4453735-0.6174316-2.1799316-0.8724976
                            c-0.4692993-0.1637573-0.9413452-0.3125-1.4205322-0.4438477
                            C147.1099243,172.1007233,145.9594727,171.8661041,144.7636719,171.7106476z"/>
                          <path d="M97.7749023,173.301651c-2.0693359,0.1702881-3.9403687,0.4227905-5.5175781,0.7572632
                            c-1.3908081,0.2962646-2.6759644,0.6400146-3.8726807,1.020874c5.5891724,7.2600098,12.1321411,16.3191528,15.9450684,22.465332
                            c3.3424072,0.4907837,7.0950928,0.9710083,11.2807007,1.401123c0.2166138,0.0250244,0.4417725,0.0452881,0.6626587,0.0679321
                            c3.6212158,0.3668823,7.5600586,0.7085571,11.8262939,0.9926147c3.6848755,0.2506104,7.6061401,0.4615479,11.7850342,0.6207275
                            c3.6403809,0.1417847,7.4785767,0.2455444,11.5089722,0.3010864l-13.3178711-19.2264404
                            c-5.6166382-4.6188354-9.1720581-6.0946045-13.6057129-6.9740601c-1.2073975-0.2158813-2.4560547-0.4151611-3.7316895-0.5925293
                            c-3.9053345-0.5413818-8.0650024-0.8856201-12.0870972-1.0262451
                            C104.7684937,172.977005,101.0291138,173.0385284,97.7749023,173.301651z"/>
                          <path d="M357.0016479,167.744278h-0.000061c-3.3057251,0.3895874-6.5942993,0.9108887-9.8770752,1.4151001
                            c-7.2989502,1.145813-14.5807495,2.6010132-21.9026489,3.5806885c-2.291626,0.2979126-5.2937622,0.6187744-6.8463135-1.4838257
                            c-2.1656494-3.1739502,3.3973999-6.7088623,5.3166504-8.1239624c2.291687-1.6901245,7.0526123-3.7869873,7.3447876-4.0848999
                            c1.4042358,0.0228882,2.8061523,0.1223145,4.1995239,0.2979126c10.2579956,1.2683105,20.6656494-0.3839111,30.0265503-4.7666626
                            c3.7324219-1.8032227,7.2018433-4.1065063,10.3125-6.8463745c3.069397-2.7527466,5.6328125-6.0219727,7.5739746-9.6593628
                            c2.0078125-4.2930298,3.4280396-8.8370361,4.2223511-13.5093994c0.8795166-4.8842773,1.1928711-9.8537598,0.9338989-14.8098755
                            c-0.2305298-4.2797852-1.0995483-8.5010986-2.578125-12.5239868c-1.4945068-3.458252-3.2488403-6.7983398-5.2479248-9.9916382
                            l11.1546631-11.2463379V0.0000153H44.0744629C31.3900757,0.2597198,20.9553833,4.1688995,12.7703247,11.7276154
                            C4.4185791,19.2909698-0.2142944,30.1240387,0.0859375,41.3875275c-0.2498169,8.8130493,2.0049438,17.5162964,6.5026245,25.0994263
                            c4.335022,6.9666748,11.9414673,12.9899292,22.8192749,18.0698242l13.0280762,6.0900879
                            c11.6072998,5.4465332,18.8470459,10.4729004,21.7192993,15.0791626c2.8394165,4.4751587,4.3365479,9.6704102,4.3140869,14.9703369
                            c0.1757812,6.7823486-2.6755371,13.2912598-7.7802124,17.760376c-5.7207642,4.8284302-13.0557251,7.3150635-20.5333862,6.9609375
                            c-5.5753784-0.1323242-11.0952148-1.1415405-16.3567505-2.9906006c-5.4314575-1.7105713-10.5618896-4.2603149-15.2052002-7.5567627
                            l-8.020813,20.0291748c10.8927612,6.9153442,23.6096191,10.4039307,36.5062256,10.0145874
                            c16.1982422,0,29.1270752-4.1746826,38.786438-12.5239868c9.1868896-7.4400635,14.479126-18.6636353,14.3745117-30.4848633
                            c0-11.0267334-2.2057495-20.1533203-6.6171875-27.3796997S71.5305786,81.1536407,60.5802002,76.0890656l-13.234375-6.0900879
                            c-5.9023438-2.5825806-11.5283813-5.7554932-16.7921753-9.4703369c-2.7501831-2.2684326-4.9401245-5.140625-6.3994751-8.3932495
                            c-1.5646973-3.4915771-2.3468628-7.2830811-2.291687-11.1088257c-0.2086182-6.0593872,2.1189575-11.9312744,6.4224243-16.2020874
                            c3.9345703-4.5297241,9.7012329-7.0447998,15.697876-6.8463745h329.656311v50.6057129l-6.7088623,6.8463745
                            c-0.9869995-0.6618042-2.0436401-1.2131958-3.151062-1.6442871c-5.9898071-2.3869019-12.3521729-3.7036133-18.7973633-3.8900757
                            c-6.4568481-0.3226929-12.9187622,0.5275269-19.0723877,2.5093384
                            c-5.7929077,2.2810669-11.0373535,5.7623901-15.3885498,10.2151489c-3.5252686,3.6461792-6.4284058,7.8460693-8.59375,12.432251
                            c-2.0709229,4.7323608-3.3948364,9.7574463-3.9244995,14.895874c-0.6143188,5.0935059-0.4210205,10.2521362,0.572937,15.2854004
                            c0.9243164,4.6137085,2.5963745,9.0453491,4.9500122,13.119812c2.2953491,3.4746704,5.0600586,6.6153564,8.2156372,9.3328247
                            c1.8535767,1.7969971,3.8270264,3.4661255,5.9067383,4.9957886c-2.291626,1.4380493-4.4286499,3.036499-6.5484009,4.583374
                            c-5.614624,4.2453003-10.9312744,11.2005005-8.2156372,19.0723877s11.5442505,10.1291504,18.9348755,10.7479248
                            c6.7479248,0.3654175,13.5145874-0.1565552,20.1265869-1.5526123c4.9958496-0.9109497,10.083313-1.3234253,15.1478882-1.8046875
                            c2.0968628-0.2062378,4.1536255-0.572937,6.302124-0.6187744c3.6400757-0.3170166,7.2283936,1.0285645,9.7625122,3.6609497
                            c0.2483521,0.3626099,0.4649658,0.7459717,0.6473999,1.145813v0.057312
                            c4.296875,10.541687-12.661499,15.1651001-25.5692749,16.7062988c-7.2416992,0.8650513-23.489624,2.0338135-34.7359619,1.2202759
                            c-0.3895874,7.5797119-3.6953125,14.2598877-9.0177002,18.6484375c9.0177002,0,22.0630493-0.0686646,29.5166626-0.5213623
                            c6.359375-0.3838501,12.5354004-0.572937,19.1469116-1.5411377c22.916626-2.9390869,41.0437622-15.0505371,41.0437622-29.21875
                            C394.1668091,176.8822784,380.3709106,164.461441,357.0016479,167.744278z M325.2218628,94.2562408
                            c4.8838501-5.0852051,11.7124023-7.8341064,18.7573242-7.5510254c6.7209473-0.1560059,13.1821289,2.5963745,17.7260132,7.5510254
                            c4.6750488,4.9138184,7.2254028,11.4719238,7.0984497,18.2531128c0,8.3531494-2.291626,17.6572876-6.5713501,22.8192749
                            c-4.5626831,5.2668457-11.2930908,8.144043-18.2531128,7.8031616c-7.1619263,0.3303223-14.0923462-2.5794678-18.8718872-7.9234619
                            c-4.583313-5.2937622-6.9838257-14.5349121-6.9838257-22.5900879
                            C317.9447632,105.7956085,320.5004883,99.1845856,325.2218628,94.2562408z"/>
                          <polygon points="401.9927368,2.1427155 408.4495239,2.1427155 408.4495239,19.4791412 410.7411499,19.4791412
                            410.7411499,2.1427155 417.1749878,2.1427155 417.1749878,0.0000153 401.9927368,0.0000153 	"/>
                          <polygon points="436.6427002,0.0000153 429.9912109,15.2625275 429.9338989,15.2625275 423.3338623,0.0000153
                            419.8963623,0.0000153 419.8963623,19.4791412 422.1879883,19.4791412 422.1879883,3.1338654 422.239624,3.1338654
                            429.2463379,19.4791412 430.6500244,19.4791412 437.651062,3.1338654 437.708374,3.1338654 437.708374,19.4791412 440,19.4791412
                            440,0.0000153 	"/>
                          </g>
                        </svg>
                      </Button></CardHeader>
                    <CardBody style={{fontSize: "16px",alignItems:'center'}}>Sling Welcome Link</CardBody>
                  </Card>
                </GridItem>
                <GridItem span={3} rowSpan={2}/>
                <GridItem span={12} rowSpan={2}/>
                <GridItem span={3}/><GridItem span={2}/><GridItem span={2} rowSpan={2} style={{fontSize: "16px",alignItems: 'center'}}><div>Build Date:</div><div>{this.state.buildDate}</div></GridItem><GridItem span={2}/><GridItem span={3}/>
              </Grid>
            </React.Fragment>

        );
    }

    private browserLink = () => (event: any) =>  {
          return window.open("/bin/browser.html");
      };

    private welcomeLink = () => (event: any) =>  {
        return window.open("/starter/index.html");
    };

    private consoleLink = () => (event: any) =>  {
        return window.open("/system/console/bundles.html");
    };
    
      private loginRedirect = () => {
        if (this.state.login) {
          return <Redirect to='/login' />
        } else {
          return ""
        }
      }
    
      private checkAuth = () => {
        fetch("/system/sling/info.sessionInfo.json")
          .then(response => response.json())
          .then(responseJSON => {
            const key = "userID"
            if (responseJSON[key] !== 'admin') {
              this.setState({ login: true })
            }
          })
      }
}

export { Admin }