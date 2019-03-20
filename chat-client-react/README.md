<h2>introduction</h2>
POC for firebase as
<ul>
 <li>chat server</li>
 <li>identity provider - authentication</li>
 <li>data base (no sql?)</li>
 </ul>



<h2>Open issues</h2>
 <ol>
 <li>what is value event used for ? </li>
 <li>i get messages \ rooms via child_added but for the loader how do i know all stuff was fully loaded</li>
 <li>how do i get the # users in a room</li>
 </ ol>


<h2>Todo</h2>
<ol>
<li>
<ul>
problem of progress when no room \ messages
<li>fix . may be use this solution - https://gist.github.com/anantn/4323949 or check </li>
<li>check what Barger did </li>
</ul>
</li>
<li>move UI to semantic ui react</li>
<li>add validation to login \ register and handle authntication errors. consider using custom hook</li>
<li>send message on enter key</li>
<li>wrap context in storage component and use useReducer</li>
<li>is it possible to wrap firebase api and move to logic file</li>
</ol>