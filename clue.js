(function () {

    const url = "http://jservice.io/api/random"
    let score = 0
    let jsonResponse

    const asyncClueFetch = async () => {
        try {
            let response = await fetch(url)
            let json = await response.json();
            
            // CS: I would probably name this variable "clue" rather than JSON response.
            //     Otherwise, I will have to spend time figuring out what's inside that
            //     JSON that I got.
            jsonResponse = json[0]
            
            while (json[0].invalid_count > 0) {
                
                // CS: You should try to not commit console.log messages to anything but
                //     feature branches.
                console.log(json[0].invalid_count); 
                
                asyncClueFetch();
            }
            setValues(jsonResponse)
        }
        catch (err) {
            console.log(err);
        }
    }

    // CS: I would probably have a different parameter name
    const setValues = function (jsonResponse) {
        let submit = document.getElementById("submit")
        submit.disabled = true;
        document.getElementById("answer").value = ""
        let answer = document.getElementById("answer").disabled = true;
        let value = document.getElementById("value").innerHTML = jsonResponse.value
        let title = document.getElementById("category").innerHTML = jsonResponse.category.title
        let question = document.getElementById("question").innerHTML = jsonResponse.question
        let score = parseInt(document.getElementById("score").innerHTML, 10)
        answer = document.getElementById("answer").disabled = false;
        answer = document.getElementById("answer")

        console.log(jsonResponse)
    }

    const init = function () {
        asyncClueFetch();
    }

    const handleKeyPress = function () {
        let submit = document.getElementById("submit")
        let answer = document.getElementById("answer")

        // CS: It's a matter of personal preference, but if you use
        //     curly braces for a block of code, put them on separate
        //     lines.
        if (answer.value.length <= 0) { submit.disabled = true; }
        else {
            // CS: This is weird. You're disabling a one-space answer?
            //     I'm not certain this is polite.
            if (answer.value == " ") {
                answer.value = "";
            }
            else {
                submit.disabled = false;
            }
        }
    }

    const handleButtonClick = function () {
        if (jsonResponse != undefined) {

            let submit = document.getElementById("submit")
            let value = document.getElementById("value").innerHTML = jsonResponse.value
            //parseInt(document.getElementById("score").innerHTML, 10)
            let answer = document.getElementById("answer")

            submit.disabled = true;
            answer.disabled = true;
            let response = answer.value
            if (response.length > 0) {
                response = response.toLowerCase();
            }
            else {
                setValues(jsonResponse);
            }
            
            // CS: I'd probably move this to a function just because it's clutter.
            response = response.replace(/\b(a|an|the|she|he|her|him|and|but|or)\b/g, "")
            response = response.replace(/\s/g, '')
            let ans = jsonResponse.answer.toLowerCase();
            ans = ans.replace(/<\/?[^>]+(>|$)/g, "")
            ans = ans.replace(/\b(a|an|the|she|he|her|him|and|but|or)\b/g, "")
            ans = ans.replace(/\s/g, '')
            
            // CS: No to console.logs.
            console.log("My response is: " + response)
            console.log("My answer is: " + ans)

            // CS: You reproduce lines 105 - 116 in the else block. That means
            //     you just remove it from the blocks and put it after the if/else.
            if (response == ans) {
                score += value;
                if (score<0){
                    document.getElementById("score").className='negative'
                }
                else if (score>0){
                    document.getElementById("score").className='positive'
                }
                else {
                    document.getElementById("score").className='neutral'
                }
                document.getElementById("score").innerHTML = score;
                console.log("My score is" + score)
                init();
            }
            else {
                score -= value;
                if (score<0){
                    document.getElementById("score").className='negative'
                }
                else if (score>0){
                    document.getElementById("score").className='positive'
                }
                else {
                    document.getElementById("score").className='neutral'
                }
                document.getElementById("score").innerHTML = score;
                console.log(score)
                init();
            }
        }
    }
    
    asyncClueFetch();
    document.getElementById("answer").addEventListener('keyup', handleKeyPress)
    document.getElementById("submit").addEventListener('click', handleButtonClick)

})();
