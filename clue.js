(function () {

    const url = "http://jservice.io/api/random"
    let jsonResponse

    const asyncClueFetch = async () => {
        try {
            let response = await fetch(url)
            let json = await response.json();
            jsonResponse = json[0]
            while (json[0].invalid_count > 0) {
                console.log(json[0].invalid_count);
                asyncClueFetch();
            }
            setValues(jsonResponse)
        }
        catch (err) {
            console.log(err);
        }
    }

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

        if (answer.value.length <= 0) { submit.disabled = true; }
        else {
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
            let score = parseInt(document.getElementById("score").innerHTML, 10)
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
            response = response.replace(/\b(a|an|the|she|he|her|him|and|but|or)\b/g, "")
            response = response.replace(/\s/g, '')
            let ans = jsonResponse.answer.toLowerCase();
            ans = ans.replace(/<\/?[^>]+(>|$)/g, "")
            ans = ans.replace(/\b(a|an|the|she|he|her|him|and|but|or)\b/g, "")
            ans = ans.replace(/\s/g, '')
            console.log("My response is: " + response)
            console.log("My answer is: " + ans)

            if (response == ans) {
                score += value;
                document.getElementById("score").innerHTML = score;
                console.log("My score is" + score)
                init();
            }
            else {
                score -= value;
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
