
let cookiesWithSession = {};

const getCookies = async () => {
    let cookies = {};
    const response = await chrome.runtime.sendMessage({greeting: "Send Cookies"});
    // do something with response here, not outside the function
    if(response.cookie != "No Cookies Found"){
        let arr = response.cookie;
        for(let i = 0;i<arr.length;i++){
            cookies[arr[i]['name']] = arr[i]['value'];
        }

    }
    else {
        const loginRequest = await chrome.runtime.sendMessage({
            message:"Please Login Into LeetCode"
        });
        console.log(loginRequest);
    }
    cookiesWithSession = cookies;
    console.log(cookies);
    console.log(response);
    return cookies;
  };



const setheaders = ()=>{
    const randomUuid = window.localStorage.getItem('random-uuid');
    const brands = window.navigator.userAgentData.brands;
    const platform = window.navigator.userAgentData.platform;
    let brandString = "";
    let isMob = "?0";
    if(platform!="Windows"){
      isMob = "?1";
    }
    for(let i = 0;i<brands.length;i++){
        brandString +=`"${brands[i].brand}";v="${brands[i].version}",`
    }


    return {
        "accept": '*/*',
        "accept-language": "en-US,en;q=0.9",
        "authorization": "",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-ch-ua":brandString,
        "random-uuid":randomUuid,
        "sec-ch-ua-platform":platform,
        "sec-ch-ua-mobile": isMob,
    }
}

let fetchUrl = 'https://leetcode.com/graphql/';


const getRequest = async({url,header,referer,bodyString}) =>{
         console.log(url,header,referer,bodyString);
         const data = fetch(url,
            {headers:header,
             body:bodyString,
             method: 'POST',
             mode: 'cors',
             credentials: 'include',
             referrerPolicy: 'strict-origin-when-cross-origin',
             referrer: referer,
            
            });
        const res = (await data).json();
        return res;      
}


let acQuestionApiName = [];

const getQuestionList = async (callBack)=>{
    let questionList;
    let cookie = getCookies();
    cookie.then((res)=>{
    let url = fetchUrl;
    let header = setheaders();
    header['x-csrftoken'] = res.csrftoken??"";
    let referer = 'https://leetcode.com/';
    bodyString = "{\"query\":\"\\n    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {\\n  problemsetQuestionList: questionList(\\n    categorySlug: $categorySlug\\n    limit: $limit\\n    skip: $skip\\n    filters: $filters\\n  ) {\\n    total: totalNum\\n    questions: data {\\n      acRate\\n      difficulty\\n      freqBar\\n      frontendQuestionId: questionFrontendId\\n      isFavor\\n      paidOnly: isPaidOnly\\n      status\\n      title\\n      titleSlug\\n      topicTags {\\n        name\\n        id\\n        slug\\n      }\\n      hasSolution\\n      hasVideoSolution\\n    }\\n  }\\n}\\n    \",\"variables\":{\"categorySlug\":\"\",\"skip\":0,\"limit\":10,\"filters\":{\"status\":\"AC\"}},\"operationName\":\"problemsetQuestionList\"}";
    const data = getRequest({url,header,referer,bodyString});
    console.log(data);
    
    data.then((res)=>{
         console.log(res);
         questionList = res.data.problemsetQuestionList.questions;
         for(let i = 0;i<questionList.length;i++){
         acQuestionApiName.push(questionList[i].titleSlug);
         }
         console.log(acQuestionApiName);
      }).then(()=>{callBack(acQuestionApiName)})
     
    })
};
const getQuestion = async (titleSlug)=>{
    let url  = fetchUrl;
    let header = setheaders();
    let cookie =  `${document.cookie};LEETCODE_SESSION=${cookiesWithSession.LEETCODE_SESSION};messages=${cookiesWithSession.messages};`
    header.cookie = cookie;
    console.log(header);
    const bodyString = `{\"query\":\"\\n    query questionContent($titleSlug: String!) {\\n  question(titleSlug: $titleSlug) {\\n    content\\n    mysqlSchemas\\n    dataSchemas\\n  }\\n}\\n    \",\"variables\":{\"titleSlug\":\"${titleSlug}\"},\"operationName\":\"questionContent\"}`
    const referer = `https://leetcode.com/problems/${titleSlug}/`
    const fetchReq = await getRequest({url,header,referer,bodyString});
    return await fetchReq
    fetchReq.then((res)=>{
       console.log(res);
    });
}

const getSubmission = async (titleSlug) =>{
let url  = fetchUrl;
let header = setheaders();
let cookie =  `${document.cookie};LEETCODE_SESSION=${cookiesWithSession.LEETCODE_SESSION};messages=${cookiesWithSession.messages};`
header.cookie = cookie;
const referer = `https://leetcode.com/problems/${titleSlug}/submissions/`
const bodyString = `{\"query\":\"\\n    query submissionList($offset: Int!, $limit: Int!, $lastKey: String, $questionSlug: String!, $lang: Int, $status: Int) {\\n  questionSubmissionList(\\n    offset: $offset\\n    limit: $limit\\n    lastKey: $lastKey\\n    questionSlug: $questionSlug\\n    lang: $lang\\n    status: $status\\n  ) {\\n    lastKey\\n    hasNext\\n    submissions {\\n      id\\n      title\\n      titleSlug\\n      status\\n      statusDisplay\\n      lang\\n      langName\\n      runtime\\n      timestamp\\n      url\\n      isPending\\n      memory\\n      hasNotes\\n      notes\\n      flagType\\n      topicTags {\\n        id\\n      }\\n    }\\n  }\\n}\\n    \",\"variables\":{\"questionSlug\":\"${titleSlug}\",\"offset\":0,\"limit\":20,\"lastKey\":null},\"operationName\":\"submissionList\"}`
const fetchReq = getRequest({url,header,referer,bodyString});
return await fetchReq;
fetchReq.then((res)=>{
  console.log(res);
})
}


const getSubmissionContent = async (titleSlug,submissionId)=>{
let url  = fetchUrl;
let header = setheaders();
let cookie =  `${document.cookie};LEETCODE_SESSION=${cookiesWithSession.LEETCODE_SESSION};messages=${cookiesWithSession.messages};`
header.cookie = cookie;
const referer = `https://leetcode.com/problems/${titleSlug}/submissions/${submissionId}/`
const bodyString = `{\"query\":\"\\n    query submissionDetails($submissionId: Int!) {\\n  submissionDetails(submissionId: $submissionId) {\\n    runtime\\n    runtimeDisplay\\n    runtimePercentile\\n    runtimeDistribution\\n    memory\\n    memoryDisplay\\n    memoryPercentile\\n    memoryDistribution\\n    code\\n    timestamp\\n    statusCode\\n    user {\\n      username\\n      profile {\\n        realName\\n        userAvatar\\n      }\\n    }\\n    lang {\\n      name\\n      verboseName\\n    }\\n    question {\\n      questionId\\n    }\\n    notes\\n    flagType\\n    topicTags {\\n      tagId\\n      slug\\n      name\\n    }\\n    runtimeError\\n    compileError\\n    lastTestcase\\n  }\\n}\\n    \",\"variables\":{\"submissionId\":${submissionId}},\"operationName\":\"submissionDetails\"}`
const fetchReq = getRequest({url,header,referer,bodyString});
return await fetchReq;
fetchReq.then((res)=>{
  console.log(res);
});

}


let question = {};
let answers = {};
// map<apiName,content>

const callBackForQuestionAnswerContent = async(acQuestionApiName)=>{
    
    for(let i = 0;i<acQuestionApiName.length;i++){
         const data = new Promise((resolve,reject)=>{
               setTimeout(() => {
                resolve(getQuestion(acQuestionApiName[i]))
               }, i*100);
         });
         data.then((res)=>{
             console.log(res,"request return "+i);
             question[acQuestionApiName[i]] = res.data.question.content??"Request Failed";
         })//.then(()=>console.log(question,123234323));
    }

    for(let i = 0;i<acQuestionApiName.length;i++){
        const data = new Promise((resolve,reject)=>{
            setTimeout(() => {
             resolve(getSubmission(acQuestionApiName[i]))
            }, i*200);
      });
        
        data.then((res)=>{
            const subId = res.data.questionSubmissionList.submissions[0].id??"Request Failed";

            const subData = new Promise((resolve,reject)=>{
                setTimeout(() => {
                 resolve(getSubmissionContent(acQuestionApiName[i],subId))
                }, i*200);
          });
            
            subData.then((res)=>{
                console.log(res,"return request "+i)
                answers[acQuestionApiName[i]] = res.data.submissionDetails.code??"Request Failed";
            })//.then(()=>{console.log(answers,11111)})
        });
    }

    //console.log(question);
    //return question;
};

getQuestionList(callBackForQuestionAnswerContent);
const promis = new Promise((resolve,reject)=>{
    
    setTimeout(() => {
        resolve(1);
    }, 10000);
  
});
promis.then(()=>{
    //let elementHTML = data;
    //console.log(elementHTML);

     //addWrappedText(elementHTML,190,doc);
    
     var specialElementHandlers = {
        'editor': function(element, renderer){
         return true;
      }
    };
    let htmlString = "";
    for(let i = 0;i<acQuestionApiName.length;i++){
        htmlString+= genrateQuestion(acQuestionApiName[i],question[acQuestionApiName[i]]);
        htmlString+= genrateAnswer(answers[acQuestionApiName[i]]);
    }
    console.log(htmlString)
    let elementHTML = genrateFinal(htmlString);
   
    //var parser = new DOMParser();
    
    //elementHTML = parser.parseFromString(elementHTML,"text/html");
    console.log(elementHTML)
   
    const myWindow = window.open();
    myWindow.document.open();
    myWindow.document.write(elementHTML);
    myWindow.document.close();
    myWindow.print();
    //myWindow.download();
   // elementHTML = myWindow.document.getElementById("container");
    
//    let mypdf=JSON.stringify(elementHTML);
//     var blob = new Blob([mypdf], {
//         type: 'text/html'
//     });
//     console.log(blob,"this is blob");
//     var url = URL.createObjectURL(blob);
//     console.log(url,"this is url");
   // chrome.downloads.download({
     //   url: url
   // });
    
//     html2canvas(elementHTML).then((canvas) => {
//     var doc = new jsPDF('p', 'pt', 'a4');
//     console.log("hiiii",canvas);
    
//     // doc.fromHTML(canvas, 10, 10,
//     //     {
//     //    'pagesplit': true,
//     //    'elementHandlers': specialElementHandlers
//     // },
//     // function(){doc.save('saveInCallback1.pdf');})
//     var imgData = canvas.toDataURL("image/png");

//     // Add the image to the PDF document
//     doc.fromHTML(elementHTML,10,10,{
//         width:canvas.width,
//     },()=>doc.save("document.pdf"),10);
    
// }
// );
    
    
})


function genrateFinal(res){
    const htmlCon = `<html>
    <head>
    
    <style> 
    
    * {
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(65, 65, 65);
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
    print-color-adjust: exact !important;
    
    }
    @media print {
        @page {
          margin-left: 0.8in;
          margin-right: 0.8in;
          margin-top: 0;
          margin-bottom: 0;
        }
     }
    #container {
        width: 800px;
        margin: 0 auto;
    }
    pre {
        text-wrap: wrap;
    }
    .questionTitle{
        
        text-align: center;
        
        font-size: 32px;
        font-family: 'Courier New', Courier, monospace;
        font-weight: bold;
        border: 1px solid black;
        margin-top:16px;
        
    }
    .questionBox{
      
    }
    .codeBox{
        
            background-color: #f4f4f4;
            color: #333;
            font-family: 'Courier New', Courier, monospace;
            font-size: 18px;
            padding: 10px;
            border: 1px solid #ccc;
          
    }
    
      
    .code-block {
        counter-reset: line;
      }
      
      .code-block code::before {
        content: counter(line);
        counter-increment: line;
        display: inline-block;
        width: 2em;
        font-size: 18px;
        text-align: right;
        margin-right: 1em;
        color: #999;
      }

    </style>
    </head>
    <body id="container">
   
    ${res}
    </body>

    </html>`;
    return htmlCon;
}
function getQuestionName(question){
    let str = question[0].toUpperCase();
    for(let i = 1;i<question.length;i++){
        if(question[i] == '-')str+=' ';
        else str+=question[i];
    }
    return str;
}

function genrateQuestion(quetionName,res){
    quetionName = getQuestionName(quetionName);
    const htmlcon = `<div class="questionTitle">${quetionName}</div><div class="questionBox">${res}</div>`;
    return htmlcon;
}
function convertHTMLToDisplayText(htmlString) {
	let encodedString = htmlString.replace(/&/g, '&amp;');
	encodedString = encodedString.replace(/</g, '&lt;');
	encodedString = encodedString.replace(/>/g, '&gt;');
	encodedString = encodedString.replace(/"/g, '&quot;');
	return encodedString
}
function addLineNo(htmlString){
    let lines = htmlString.split("\n");
	for (let i=0;i<lines.length;i++) {
		lines[i] = "<code>"+lines[i]+"</code>";
	}
	text = lines.join("\n");
    return text;
}
function genrateAnswer(res){
   
    res = convertHTMLToDisplayText(res);
    res = addLineNo(res);
    
    const htmlCon = `<div>Solution</div><div class="codeBox"><pre class="code-block">${res}</pre></div><p style="page-break-after: always;">&nbsp;</p>`;
    return htmlCon;
}


// promise1.then(
//     (res)=>{
//         var doc = new jsPDF();

//         // Source HTMLElement or a string containing HTML.
        
//         var elementHTML = genrateHtml(res);
//         console.log(elementHTML)
//         //var splitText = doc.splitTextToSize(elementHTML, 180)
//         //addWrappedText(elementHTML,190,doc);
//         var specialElementHandlers = {
//             'editor': function(element, renderer){
//              return true;
//           }
      
//           };
//         doc.fromHTML(elementHTML, 10, 10, {
//             'width': 190,
//             'margin': 10,
//             'pagesplit': true,
//             'elementHandlers': specialElementHandlers
//          });
//        //doc.save('sample-document.pdf');
//         //window.open(doc.output('bloburl'), '_blank');
//     }   
// );




// async function toJSON(body) {
//     const reader = body.getReader();
//     const decoder = new TextDecoder();
//     const chunks = [];
  
//     async function read() {
//       const { done, value } = await reader.read();
  
//       if (done) {
//         return JSON.parse(chunks.join(''));
//       }
  
//       const chunk = decoder.decode(value, { stream: true });
//       chunks.push(chunk);
//       return read();
//     }
  
//     return read();
//   }
  


 
//  // doc.save("newpdf");
//  return data;
// }
//   const promiseres = new Promise((resolve,reject)=>{
//     let data = reqpage();
//     console.log("this is promise2");
//     console.log(data);
//     resolve(data);
//   });
//   promiseres.then(data=>toJSON(data.body)).then((res)=>{
    
//         //let res = toJSON(data.body);
//         console.log(res);
        

//         // Parse the text
//        //
        


//         // You can now even select part of that html as you would in the regular DOM 
//         // Example:
//         // var docArticle = doc.querySelector('article').innerHTML;
//         var doc = new jsPDF("p", "mm", "a4");
//         var parser = new DOMParser();
//         // Source HTMLElement or a string containing HTML.
//         var htmlfile = res.data.question.content;
//         htmlfile = parser.parseFromString(htmlfile, );
//         img = htmlfile.querySelectorAll('img');
//         console.log(img);
//         for(let i = 0;i<img.length;i++){
//             img[i].style.height = "auto";
//              img[i].style.width = "auto";
//              console.log(img[i]);
//         }
        
//         console.log("this is file");
        
//         const doctype = '<!DOCTYPE html>';
//         let html = htmlfile.documentElement.outerHTML;

//         html = doctype + html;
//         var elementHTML = genrateHtml(res.data.question.content);
//         elementHTML = html;
//         console.log(elementHTML)
//         //var splitText = doc.splitTextToSize(elementHTML, 180)
//         //addWrappedText(elementHTML,190,doc);
//         var specialElementHandlers = {
//             'editor': function(element, renderer){
//              return true;
//           }
      
//           };
//         doc.fromHTML(elementHTML, 10, 10,
//              {
            
//             'width': 190,
//             'margin': 10,
//             'pagesplit': true,
//             'elementHandlers': specialElementHandlers
//          },function(){doc.save('saveInCallback.pdf');},0);
//         //doc.save('sample-document.pdf');
//         //window.open(doc.output('bloburl'), '_blank');
        
//         //console.log(doc);

//     });
    
    



  




