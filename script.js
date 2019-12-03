var index = 0;
var data = [];
const host = "https://api.edamam.com";
const appId = "4629df7d";
const apiKey = "a04da6cfd96bad9e15d82c5ce59d012a";

// Recipes
function getRecipes(query) {
    $.ajax({
        url: `${host}/search?app_id=${appId}&app_key=${apiKey}&q=${query}`,
        success: function (result) {
           // perloadfunction();
            console.log(result);
            index = 0;
            data = result;
            loadRecipes(result);
        }
    });
}

function cleandata()
{
    document.getElementById("recipes").innerHTML="";
    document.getElementById("recipes").style="";
    document.getElementById("search-input").value="";
}

function kFormatter(num) {
    return Math.abs(num) > 999 ?
        Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k" :
        Math.sign(num) * Math.abs(num);
}

function loadRecipes(result) {
    let recipes = result.hits;
    $("#recipes").empty();
    recipes.forEach(recipe => {
        $("#recipes").append(
            `<div class="recipe-card card" style="width: 18rem;">
            <a href="${recipe.recipe.url}" class="btn">
                <img src="${recipe.recipe.image}" class="card-img-top" alt="...">
            </a>
            <div class="card-body">
                <h5 class="card-title">${recipe.recipe.label}</h5>
                <p class="card-text">Calories: ${kFormatter(recipe.recipe.calories)}cal.</p>
                <button class="btn btn-success" onclick=openModalforIngredients(${index}) id="ingredientsbtn" data-toggle="modal" data-target="#mailModal">Ingredients</button>
                <button class="btn btn-success" onclick=openModalforNutrient(${index}) id="Nutrientbtn" data-toggle="modal" data-target="#mailModal">Nutrient</button>
            
            </div>
        </div>`
        );
        index++;
        $("#recipes").show();
    });
}

$(document).ready(function () {
    // Get Recipes
    $("#search-button").click(function () {
        let userQuery = $("#search-input").val();
        if (userQuery) {
            getRecipes(userQuery);
        }
    });
    $("#search-input").keypress(function (event) {
        let key = event.key ? event.key : event.which;
        if (key === "Enter") {
            let userQuery = $("#search-input").val();
            if (userQuery) {
                getRecipes(userQuery);
            }
        }
    });
 });

function openModalforIngredients(ind) {
    document.getElementById("datare").innerHTML = "";
    var div1 = document.createElement("div");
    document.getElementById("mailheader").innerHTML = "Ingredients";
    for (var i = 0; i < data.hits[ind].recipe.ingredients.length; i++) {
        var p = document.createElement('p');
        p.innerHTML = data.hits[ind].recipe.ingredients[i].text;
        div1.append(p)
        console.log(p);
    }
    console.log(div1)
    document.getElementById("datare").append(div1);
}

function openModalforNutrient(ind) {
    document.getElementById("datare").innerHTML = "";
    var div1 = document.createElement("div");
    document.getElementById("mailheader").innerHTML = "Nutrient";
    for (var i = 0; i < data.hits[ind].recipe.digest.length; i++) {
        var p = document.createElement('p');
        p.innerHTML = data.hits[ind].recipe.digest[i].label + "   ->  " + data.hits[ind].recipe.digest[i].total;
        div1.append(p)
        console.log(p);
    }
    console.log(div1)
    document.getElementById("datare").append(div1);
}
