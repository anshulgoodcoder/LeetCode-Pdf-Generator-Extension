
// console.log("Hiiiii");
// const heading = document.querySelector('.heading');
// console.log(heading);
// const handleClick = document.querySelector('.handleClick');
// console.log(handleClick);
// handleClick.addEventListener('click',()=>{

// //heading.innerHTML.textContent = "hiii"
// heading.textContent = 'hiiiiiiiiiii';

// console.log("hiii");
// })
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "Send Cookies"){
      let cookies = leetcodeCookies;
      console.log(cookies)
      sendResponse({farewell: "goodbye",cookie:cookies});
    }
    }
 );
 function downloadFile(options) {
  if(!options.url) {
      var blob = new Blob([ options.content ], {type : "text/html;charset=UTF-8"});
      options.url = URL.createObjectURL(blob);
  }
  chrome.downloads.download({
      url: options.url,
      filename: options.filename
  })
}
let contentmy =  `<html>
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
    max-width: 800px;
    margin: 0 auto;
}
.questionTitle{
    
    text-align: center;
    
    font-size: 32px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    border: 1px solid black;
    margin-top:16px;
    
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

<div class="questionTitle">Two sum</div><div><p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>

<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>

<p>You can return the answer in any order.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> nums = [2,7,11,15], target = 9
<strong>Output:</strong> [0,1]
<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> nums = [3,2,4], target = 6
<strong>Output:</strong> [1,2]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> nums = [3,3], target = 6
<strong>Output:</strong> [0,1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
<li><strong>Only one valid answer exists.</strong></li>
</ul>

<p>&nbsp;</p>
<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font>time complexity?</div><div>Solution</div><div class="codeBox"><pre class="code-block"><code>class Solution {</code>
<code>public:</code>
<code>    vector&lt;int&gt; twoSum(vector&lt;int&gt;&amp; nums, int target) {</code>
<code>        map&lt;int,int&gt; mpp;</code>
<code>        for(int i = 0;i&lt;nums.size();i++){</code>
<code>            int x = target-nums[i];</code>
<code>            if(mpp.find(x)!=mpp.end()){</code>
<code>                return {mpp[x],i};</code>
<code>            }</code>
<code>            else mpp[nums[i]] = i;</code>
<code>        }</code>
<code>        return {};</code>
<code>    }</code>
<code>};</code></pre></div><p style="page-break-after: always;">&nbsp;</p><div class="questionTitle">Add two numbers</div><div><p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit. Add the two numbers and return the sum&nbsp;as a linked list.</p>

<p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/02/addtwonumber1.jpg" style="width: 483px; height: 342px;" />
<pre>
<strong>Input:</strong> l1 = [2,4,3], l2 = [5,6,4]
<strong>Output:</strong> [7,0,8]
<strong>Explanation:</strong> 342 + 465 = 807.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> l1 = [0], l2 = [0]
<strong>Output:</strong> [0]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
<strong>Output:</strong> [8,9,9,9,0,0,0,1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
<li>The number of nodes in each linked list is in the range <code>[1, 100]</code>.</li>
<li><code>0 &lt;= Node.val &lt;= 9</code></li>
<li>It is guaranteed that the list represents a number that does not have leading zeros.</li>
</ul>
</div><div>Solution</div><div class="codeBox"><pre class="code-block"><code>/**</code>
<code> * Definition for singly-linked list.</code>
<code> * struct ListNode {</code>
<code> *     int val;</code>
<code> *     ListNode *next;</code>
<code> *     ListNode() : val(0), next(nullptr) {}</code>
<code> *     ListNode(int x) : val(x), next(nullptr) {}</code>
<code> *     ListNode(int x, ListNode *next) : val(x), next(next) {}</code>
<code> * };</code>
<code> */</code>
<code>class Solution {</code>
<code>public:</code>
<code>    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {</code>
<code>       if(!l1){</code>
<code>           return l2;</code>
<code>       }</code>
<code>       if(!l2){</code>
<code>           return l1;</code>
<code>       }</code>
<code>       int rem  = 0;</code>
<code>       ListNode* temp = new ListNode(0);</code>
<code>       ListNode* head = temp;</code>
<code>       while(l1 || l2 || rem ){</code>
<code>           int sum = 0;</code>
<code>           if(l1){</code>
<code>              sum += l1-&gt;val;</code>
<code>              l1 = l1-&gt;next;</code>
<code>                </code>
<code>           }</code>
<code>           if(l2){</code>
<code>               sum += l2-&gt;val;</code>
<code>               l2 = l2-&gt;next;</code>
<code>           }</code>
<code>           sum += rem;</code>
<code>           temp-&gt;next = new ListNode(sum%10);</code>
<code>           rem = sum/10;</code>
<code>           temp = temp-&gt;next;</code>
<code>       }</code>
<code>       </code>
<code>       return head-&gt;next;</code>
<code>    }</code>
<code>};</code></pre></div><p style="page-break-after: always;">&nbsp;</p><div class="questionTitle">Longest substring without repeating characters</div><div><p>Given a string <code>s</code>, find the length of the <strong>longest</strong> <span data-keyword="substring-nonempty"><strong>substring</strong></span> without repeating characters.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;abcabcbb&quot;
<strong>Output:</strong> 3
<strong>Explanation:</strong> The answer is &quot;abc&quot;, with the length of 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;bbbbb&quot;
<strong>Output:</strong> 1
<strong>Explanation:</strong> The answer is &quot;b&quot;, with the length of 1.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;pwwkew&quot;
<strong>Output:</strong> 3
<strong>Explanation:</strong> The answer is &quot;wke&quot;, with the length of 3.
Notice that the answer must be a substring, &quot;pwke&quot; is a subsequence and not a substring.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
<li><code>0 &lt;= s.length &lt;= 5 * 10<sup>4</sup></code></li>
<li><code>s</code> consists of English letters, digits, symbols and spaces.</li>
</ul>
</div><div>Solution</div><div class="codeBox"><pre class="code-block"><code>class Solution {</code>
<code>public:</code>
<code>    int lengthOfLongestSubstring(string s) {</code>
<code>        int arr[256]={0};</code>
<code>        int i=0,j=0,ans=0;</code>
<code>        while(j&lt;s.size()){</code>
<code>            arr[s[j]]++;</code>
<code>            while(arr[s[j]]&gt;1){</code>
<code>                arr[s[i]]--;</code>
<code>                i++;</code>
<code>            }</code>
<code>             ans=max(ans,j-i+1);</code>
<code>            j++;</code>
<code>            </code>
<code>        }</code>
<code>        return ans;</code>
<code>    }</code>
<code>};</code></pre></div><p style="page-break-after: always;">&nbsp;</p><div class="questionTitle">Median of two sorted arrays</div><div><p>Given two sorted arrays <code>nums1</code> and <code>nums2</code> of size <code>m</code> and <code>n</code> respectively, return <strong>the median</strong> of the two sorted arrays.</p>

<p>The overall run time complexity should be <code>O(log (m+n))</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> nums1 = [1,3], nums2 = [2]
<strong>Output:</strong> 2.00000
<strong>Explanation:</strong> merged array = [1,2,3] and median is 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> nums1 = [1,2], nums2 = [3,4]
<strong>Output:</strong> 2.50000
<strong>Explanation:</strong> merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
<li><code>nums1.length == m</code></li>
<li><code>nums2.length == n</code></li>
<li><code>0 &lt;= m &lt;= 1000</code></li>
<li><code>0 &lt;= n &lt;= 1000</code></li>
<li><code>1 &lt;= m + n &lt;= 2000</code></li>
<li><code>-10<sup>6</sup> &lt;= nums1[i], nums2[i] &lt;= 10<sup>6</sup></code></li>
</ul>
</div><div>Solution</div><div class="codeBox"><pre class="code-block"><code>class Solution {</code>
<code>public:</code>
<code>    double findMedianSortedArrays(vector&lt;int&gt;&amp; nums1, vector&lt;int&gt;&amp; nums2) {</code>
<code>        vector&lt;int&gt; v;</code>
<code>        int n=nums1.size();</code>
<code>        int m=nums2.size();</code>
<code>        int i=0,j=0;</code>
<code>        while(i&lt;n&amp;&amp;j&lt;m){</code>
<code>          if(nums1[i]&lt;nums2[j]){v.push_back(nums1[i]);i++;}</code>
<code>          else {v.push_back(nums2[j]);j++;}</code>
<code>          </code>
<code>        }</code>
<code>        while(i&lt;n){</code>
<code>            v.push_back(nums1[i]);i++;</code>
<code>        }</code>
<code>         while(j&lt;m){</code>
<code>            v.push_back(nums2[j]);j++;</code>
<code>        }</code>
<code>        int size=v.size();</code>
<code>        double mid;</code>
<code>        if(size%2)mid=v[(size/2)]/1.0;</code>
<code>        else mid=(v[((size-1)/2)]+v[(size/2)])/2.0;</code>
<code>        return mid;</code>
<code>    }</code>
<code>};</code></pre></div><p style="page-break-after: always;">&nbsp;</p><div class="questionTitle">Reverse integer</div><div><p>Given a signed 32-bit integer <code>x</code>, return <code>x</code><em> with its digits reversed</em>. If reversing <code>x</code> causes the value to go outside the signed 32-bit integer range <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code>, then return <code>0</code>.</p>

<p><strong>Assume the environment does not allow you to store 64-bit integers (signed or unsigned).</strong></p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> x = 123
<strong>Output:</strong> 321
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> x = -123
<strong>Output:</strong> -321
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> x = 120
<strong>Output:</strong> 21
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
<li><code>-2<sup>31</sup> &lt;= x &lt;= 2<sup>31</sup> - 1</code></li>
</ul>
</div><div>Solution</div><div class="codeBox"><pre class="code-block"><code>class Solution {</code>
<code>public:</code>
<code>    int reverse(int x) {</code>
<code>        int rev = 0;</code>
<code>        int sign = 1;</code>
<code></code>
<code>        if(x&lt;0){</code>
<code>            sign = -1;</code>
<code>        }</code>
<code></code>
<code>        x = abs(x);</code>
<code>        </code>
<code>        while(x&gt;0){</code>
<code>            int rem = x%10;</code>
<code>            if(rev &gt; INT_MAX/10 || rev == INT_MAX/10 &amp;&amp; rem&gt;7)return 0;</code>
<code>            rev = 10*rev + rem;</code>
<code>            x = x/10;</code>
<code>        }</code>
<code>        return sign*rev;</code>
<code>    }</code>
<code>};</code></pre></div><p style="page-break-after: always;">&nbsp;</p><div class="questionTitle">String to integer atoi</div><div><p>Implement the <code>myAtoi(string s)</code> function, which converts a string to a 32-bit signed integer (similar to C/C++&#39;s <code>atoi</code> function).</p>

<p>The algorithm for <code>myAtoi(string s)</code> is as follows:</p>

<ol>
<li>Read in and ignore any leading whitespace.</li>
<li>Check if the next character (if not already at the end of the string) is <code>&#39;-&#39;</code> or <code>&#39;+&#39;</code>. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.</li>
<li>Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.</li>
<li>Convert these digits into an integer (i.e. <code>&quot;123&quot; -&gt; 123</code>, <code>&quot;0032&quot; -&gt; 32</code>). If no digits were read, then the integer is <code>0</code>. Change the sign as necessary (from step 2).</li>
<li>If the integer is out of the 32-bit signed integer range <code>[-2<sup>31</sup>, 2<sup>31</sup> - 1]</code>, then clamp the integer so that it remains in the range. Specifically, integers less than <code>-2<sup>31</sup></code> should be clamped to <code>-2<sup>31</sup></code>, and integers greater than <code>2<sup>31</sup> - 1</code> should be clamped to <code>2<sup>31</sup> - 1</code>.</li>
<li>Return the integer as the final result.</li>
</ol>

<p><strong>Note:</strong></p>

<ul>
<li>Only the space character <code>&#39; &#39;</code> is considered a whitespace character.</li>
<li><strong>Do not ignore</strong> any characters other than the leading whitespace or the rest of the string after the digits.</li>
</ul>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;42&quot;
<strong>Output:</strong> 42
<strong>Explanation:</strong> The underlined characters are what is read in, the caret is the current reader position.
Step 1: &quot;42&quot; (no characters read because there is no leading whitespace)
     ^
Step 2: &quot;42&quot; (no characters read because there is neither a &#39;-&#39; nor &#39;+&#39;)
     ^
Step 3: &quot;<u>42</u>&quot; (&quot;42&quot; is read in)
       ^
The parsed integer is 42.
Since 42 is in the range [-2<sup>31</sup>, 2<sup>31</sup> - 1], the final result is 42.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;   -42&quot;
<strong>Output:</strong> -42
<strong>Explanation:</strong>
Step 1: &quot;<u>   </u>-42&quot; (leading whitespace is read and ignored)
        ^
Step 2: &quot;   <u>-</u>42&quot; (&#39;-&#39; is read, so the result should be negative)
         ^
Step 3: &quot;   -<u>42</u>&quot; (&quot;42&quot; is read in)
           ^
The parsed integer is -42.
Since -42 is in the range [-2<sup>31</sup>, 2<sup>31</sup> - 1], the final result is -42.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;4193 with words&quot;
<strong>Output:</strong> 4193
<strong>Explanation:</strong>
Step 1: &quot;4193 with words&quot; (no characters read because there is no leading whitespace)
     ^
Step 2: &quot;4193 with words&quot; (no characters read because there is neither a &#39;-&#39; nor &#39;+&#39;)
     ^
Step 3: &quot;<u>4193</u> with words&quot; (&quot;4193&quot; is read in; reading stops because the next character is a non-digit)
         ^
The parsed integer is 4193.
Since 4193 is in the range [-2<sup>31</sup>, 2<sup>31</sup> - 1], the final result is 4193.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
<li><code>0 &lt;= s.length &lt;= 200</code></li>
<li><code>s</code> consists of English letters (lower-case and upper-case), digits (<code>0-9</code>), <code>&#39; &#39;</code>, <code>&#39;+&#39;</code>, <code>&#39;-&#39;</code>, and <code>&#39;.&#39;</code>.</li>
</ul>
</div><div>Solution</div><div class="codeBox"><pre class="code-block"><code>class Solution {</code>
<code>public:</code>
<code>    int myAtoi(string s) {</code>
<code>        int n = s.size();</code>
<code>        bool sign = false;</code>
<code>        int ind = 0,res = 0;</code>
<code>        while(ind&lt;n &amp;&amp; s[ind] == ' ')ind++;</code>
<code>        if(ind&lt;n &amp;&amp; s[ind] == '-'){</code>
<code>            sign = true;</code>
<code>            ind++;</code>
<code>        }</code>
<code>        if(ind&lt;n &amp;&amp; s[ind] == '+' &amp;&amp; sign != true){</code>
<code>            sign = false;</code>
<code>            ind++;</code>
<code>        }</code>
<code>        while(ind&lt;n &amp;&amp; isdigit(s[ind])){</code>
<code>            int digit = s[ind++]-'0';</code>
<code>            if(res &gt; INT_MAX/10 || res == INT_MAX/10 &amp;&amp; digit &gt;INT_MAX%10){</code>
<code>               return sign == true ? INT_MIN:INT_MAX;</code>
<code>            }</code>
<code>            res = res*10 +digit;</code>
<code>        }</code>
<code>        return sign == true ? -1*res:res;</code>
<code>    }</code>
<code>};</code></pre></div><p style="page-break-after: always;">&nbsp;</p><div class="questionTitle">Palindrome number</div><div><p>Given an integer <code>x</code>, return <code>true</code><em> if </em><code>x</code><em> is a </em><span data-keyword="palindrome-integer"><em><strong>palindrome</strong></em></span><em>, and </em><code>false</code><em> otherwise</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> x = 121
<strong>Output:</strong> true
<strong>Explanation:</strong> 121 reads as 121 from left to right and from right to left.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> x = -121
<strong>Output:</strong> false
<strong>Explanation:</strong> From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> x = 10
<strong>Output:</strong> false
<strong>Explanation:</strong> Reads 01 from right to left. Therefore it is not a palindrome.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
<li><code>-2<sup>31</sup>&nbsp;&lt;= x &lt;= 2<sup>31</sup>&nbsp;- 1</code></li>
</ul>

<p>&nbsp;</p>
<strong>Follow up:</strong> Could you solve it without converting the integer to a string?</div><div>Solution</div><div class="codeBox"><pre class="code-block"><code>class Solution {</code>
<code>public:</code>
<code>    bool isPalindrome(int x) {</code>
<code>        if(x&lt;0)return false;</code>
<code>        long rev=0,n=x;</code>
<code>        while(n&gt;0){</code>
<code>            int rem=n%10;</code>
<code>            rev=(rev*10)+rem;</code>
<code>            n=n/10;</code>
<code>        }</code>
<code>        return (rev==x)?true:false;</code>
<code>    }</code>
<code>};</code></pre></div><p style="page-break-after: always;">&nbsp;</p><div class="questionTitle">Container with most water</div><div><p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p>

<p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>

<p>Return <em>the maximum amount of water a container can store</em>.</p>

<p><strong>Notice</strong> that you may not slant the container.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg" style="width: 600px; height: 287px;" />
<pre>
<strong>Input:</strong> height = [1,8,6,2,5,4,8,3,7]
<strong>Output:</strong> 49
<strong>Explanation:</strong> The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> height = [1,1]
<strong>Output:</strong> 1
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
<li><code>n == height.length</code></li>
<li><code>2 &lt;= n &lt;= 10<sup>5</sup></code></li>
<li><code>0 &lt;= height[i] &lt;= 10<sup>4</sup></code></li>
</ul>
</div><div>Solution</div><div class="codeBox"><pre class="code-block"><code>class Solution {</code>
<code>public:</code>
<code>    int maxArea(vector&lt;int&gt;&amp; h) {</code>
<code>       int low=0,high=h.size()-1;</code>
<code>        int maxarea=INT_MIN;</code>
<code>       while(low&lt;high){</code>
<code>           int lmax=(high-low)*min(h[low],h[high]);</code>
<code>           if(h[low]&lt;=h[high])low++;</code>
<code>           else high--;</code>
<code>           maxarea=max(lmax,maxarea);</code>
<code>       }</code>
<code>        return maxarea;</code>
<code>    }</code>
<code>};</code></pre></div><p style="page-break-after: always;">&nbsp;</p><div class="questionTitle">Roman to integer</div><div><p>Roman numerals are represented by seven different symbols:&nbsp;<code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.</p>

<pre>
<strong>Symbol</strong>       <strong>Value</strong>
I             1
V             5
X             10
L             50
C             100
D             500
M             1000</pre>

<p>For example,&nbsp;<code>2</code> is written as <code>II</code>&nbsp;in Roman numeral, just two ones added together. <code>12</code> is written as&nbsp;<code>XII</code>, which is simply <code>X + II</code>. The number <code>27</code> is written as <code>XXVII</code>, which is <code>XX + V + II</code>.</p>

<p>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not <code>IIII</code>. Instead, the number four is written as <code>IV</code>. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as <code>IX</code>. There are six instances where subtraction is used:</p>

<ul>
<li><code>I</code> can be placed before <code>V</code> (5) and <code>X</code> (10) to make 4 and 9.&nbsp;</li>
<li><code>X</code> can be placed before <code>L</code> (50) and <code>C</code> (100) to make 40 and 90.&nbsp;</li>
<li><code>C</code> can be placed before <code>D</code> (500) and <code>M</code> (1000) to make 400 and 900.</li>
</ul>

<p>Given a roman numeral, convert it to an integer.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;III&quot;
<strong>Output:</strong> 3
<strong>Explanation:</strong> III = 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;LVIII&quot;
<strong>Output:</strong> 58
<strong>Explanation:</strong> L = 50, V= 5, III = 3.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> s = &quot;MCMXCIV&quot;
<strong>Output:</strong> 1994
<strong>Explanation:</strong> M = 1000, CM = 900, XC = 90 and IV = 4.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
<li><code>1 &lt;= s.length &lt;= 15</code></li>
<li><code>s</code> contains only&nbsp;the characters <code>(&#39;I&#39;, &#39;V&#39;, &#39;X&#39;, &#39;L&#39;, &#39;C&#39;, &#39;D&#39;, &#39;M&#39;)</code>.</li>
<li>It is <strong>guaranteed</strong>&nbsp;that <code>s</code> is a valid roman numeral in the range <code>[1, 3999]</code>.</li>
</ul>
</div><div>Solution</div><div class="codeBox"><pre class="code-block"><code>class Solution {</code>
<code>public:</code>
<code>    int romanToInt(string s) {</code>
<code>        int n = s.size()-1;</code>
<code>        map&lt;char,int&gt; mpp = {</code>
<code>             { 'I' , 1 },</code>
<code>             { 'V' , 5 },</code>
<code>             { 'X' , 10 },</code>
<code>             { 'L' , 50 },</code>
<code>             { 'C' , 100 },</code>
<code>             { 'D' , 500 },</code>
<code>             { 'M' , 1000 } </code>
<code>        };</code>
<code>        int sum = mpp[s[n]];</code>
<code>        for(int i = n-1;i&gt;=0;i--){</code>
<code>            if(mpp[s[i]]&lt;mpp[s[i+1]]){</code>
<code>                sum -=mpp[s[i]];</code>
<code>            }</code>
<code>            else sum += mpp[s[i]];</code>
<code>        }</code>
<code>        return sum;</code>
<code>    }</code>
<code>};</code></pre></div><p style="page-break-after: always;">&nbsp;</p><div class="questionTitle">Longest common prefix</div><div><p>Write a function to find the longest common prefix string amongst an array of strings.</p>

<p>If there is no common prefix, return an empty string <code>&quot;&quot;</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> strs = [&quot;flower&quot;,&quot;flow&quot;,&quot;flight&quot;]
<strong>Output:</strong> &quot;fl&quot;
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> strs = [&quot;dog&quot;,&quot;racecar&quot;,&quot;car&quot;]
<strong>Output:</strong> &quot;&quot;
<strong>Explanation:</strong> There is no common prefix among the input strings.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
<li><code>1 &lt;= strs.length &lt;= 200</code></li>
<li><code>0 &lt;= strs[i].length &lt;= 200</code></li>
<li><code>strs[i]</code> consists of only lowercase English letters.</li>
</ul>
</div><div>Solution</div><div class="codeBox"><pre class="code-block"><code>class Solution {</code>
<code>public:</code>
<code>    int pre(string x,string y){</code>
<code>        int i = 0;</code>
<code>        while(i&lt;x.size()&amp;&amp;i&lt;y.size()){</code>
<code>            if(x[i] != y[i])return i;</code>
<code>            i++;</code>
<code>        }</code>
<code>        return i;</code>
<code>    }</code>
<code>    string longestCommonPrefix(vector&lt;string&gt;&amp; strs) {</code>
<code>        int mini=INT_MAX;</code>
<code>        for(int i = 1;i&lt;strs.size();i++){</code>
<code>            int x = pre(strs[i],strs[i-1]);</code>
<code>            mini = min(mini,x);</code>
<code>        }</code>
<code>        return strs[0].substr(0,mini);</code>
<code>    }</code>
<code>};</code></pre></div><p style="page-break-after: always;">&nbsp;</p>
</body>

</html>`
// Download file with custom content
downloadFile({
filename: "foo.pdf",
content: contentmy
});


