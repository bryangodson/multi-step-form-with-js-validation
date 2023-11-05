// declaration of some variables
let person_name,
  email,
  phone_number,
  back_button,
  next_button,
  plans,
  add_ons,
  setAddOns,
  online_service_final,
  larger_storage_final,
  custom_profile_final,
  finalEstimates;
// checkbox for the year and monthly toggle
let checkbox = document.querySelector("#checkbox");
/*********************
 * setting the plan selected variable to the data of the item with the class selected. since that will be what the user has clicked on
 **********************/
// setting type of plan to year since that is the default.
// declaring the final estimate object to hold all numbers that will be used for later calculation
finalEstimates = {
  plan: "90",
  add_ons: [true, true, false],
  plan_is_monthly: false,
};
const updateTotalValues = () => {
  let plan = "";
  let online_service = "";
  let larger_storage = "";
  let custom_profile = "";
  let planSuffix = "";
  let chosenPlan = parseInt(finalEstimates.plan);
  // setting values when plan is monthly
  if (finalEstimates.plan_is_monthly) {
    planSuffix = "/mo";
    // checking the chosen plan
    if (chosenPlan == 9) {
      plan = "Arcade (Monthly)";
    } else if (chosenPlan == 12) {
      plan = "Advance (Monthly)";
    } else {
      plan = "Pro (Monthly)";
    }
    if (finalEstimates.add_ons[0]) {
      online_service = "+$1/mo";
      find(".online_service_final").style.display = "flex";

      online_service_final = 1;
    } else {
      online_service = "";
      find(".online_service_final").style.display = "none";
      online_service_final = 0;
    }
    if (finalEstimates.add_ons[1]) {
      larger_storage = "+$2/mo";
      find(".larger_storage_final").style.display = "flex";

      larger_storage_final = 2;
    } else {
      larger_storage = "";
      find(".larger_storage_final").style.display = "none";
      larger_storage_final = 0;
    }
    if (finalEstimates.add_ons[2]) {
      custom_profile = "+$2/mo";
      find(".customizable_profile_final").style.display = "flex";

      custom_profile_final = 2;
    } else {
      custom_profile = "";
      find(".customizable_profile_final").style.display = "none";
      custom_profile_final = 0;
    }
  } else {
    planSuffix = "/yr";
    if (chosenPlan == 90) {
      plan = "Arcade (Yearly)";
    } else if (chosenPlan == 120) {
      plan = "Advance  (Yearly)";
    } else {
      plan = "Pro  (Yearly)";
    }
    if (finalEstimates.add_ons[0]) {
      online_service = "+$10/yr";
      find(".online_service_final").style.display = "flex";

      online_service_final = 10;
    } else {
      online_service = "";
      find(".online_service_final").style.display = "none";
      online_service_final = 0;
    }

    if (finalEstimates.add_ons[1]) {
      larger_storage = "+$20/yr";
      find(".larger_storage_final").style.display = "flex";

      larger_storage_final = 20;
    } else {
      larger_storage = "";
      find(".larger_storage_final").style.display = "none";
      larger_storage_final = 0;
    }
    if (finalEstimates.add_ons[2]) {
      custom_profile = "+$20/yr";
      find(".customizable_profile_final").style.display = "flex";
      custom_profile_final = 20;
    } else {
      custom_profile = "";
      find(".customizable_profile_final").style.display = "none";
      custom_profile_final = 0;
    }
  }
  find(".plan_final p:nth-child(2").textContent = "$" + chosenPlan + planSuffix;
  find(".online_service_final p:nth-child(2)").textContent = online_service;
  find(".customizable_profile_final p:nth-child(2)").textContent =
    custom_profile;
  find(".larger_storage_final p:nth-child(2)").textContent = larger_storage;

  find(".plan_text").textContent = plan;
  const getSum = (...arg) => {
    total = 0;
    for (let i = 0; i < arg.length; i++) {
      const currentItem = parseInt(arg[i]);
      total += currentItem;
    }
    find(".total").textContent = "$" + total + planSuffix;
    return total;
  };
  let x = getSum(
    chosenPlan,
    online_service_final,
    custom_profile_final,
    larger_storage_final
  );
};
// this function sets the add on text per the plan that is selected
setAddOns = () => {
  // an array to hold all the add on components
  add_ons = ["add_on_one", "add_on_two", "add_on_three"];
  // looping through the array and setting the text content for all three add ons to months or years.
  // the array is arranged according to how the components appear in the page
  for (const index in add_ons) {
    let text = index == 2 ? 2 : 1;
    text = finalEstimates.plan_is_monthly
      ? "+$" + text + "/mo"
      : "+$" + text + "0/yr";
    find(`#step3 form .${add_ons[index]} > p`).textContent = text;
  }
  /*************************
   setting add on values for final  calculation....so add ons selected are set to true or false depending on whether they have a class selected or not
   ***********************/
};
// the checkbox for toggling the plan type
checkbox.onchange = function () {
  // getting the label that is acting as the switch
  let label = document.querySelector(".last label");
  // label class set to active after the checkbox is on and of after the checkbox is off
  label.classList.toggle("active");
  // getting the plan components
  // checking to see if the switch is on year or month
  // this if gets executed when it is on:in other words set to years
  if (label.classList.contains("active")) {
    // calling the set function to toggle the switch
    setYearly();
  } else {
    // this else is for months

    setMonthly();
  }
  // finally setting the plan selected for the item with selected class
  finalEstimates.plan = find("#step2 .selected").dataset.plan;
};
// function to get elements
function find(target = "") {
  return document.querySelector(target);
}
function findAll(target = "") {
  return document.querySelectorAll(target);
}

// finding the selected plan for the final estimates object.
function selectedPlan(plan) {
  plan = find("#step2 form div .selected").dataset.plan;
  finalEstimates.plan = plan;
}
// getting all  plans available to users
plans = findAll(".plan");
plans.forEach((plan) => {
  plan.addEventListener("click", () => {
    //removing all selected class from all plans
    plans.forEach((other_plan) => {
      other_plan.classList.remove("selected");
    });
    // setting the current plan that is clicked to selected
    plan.classList.add("selected");
    // setting the plan selected variable to hold the data-plan of the selected item
    selectedPlan(plan.dataset.plan);
    updateTotalValues();
  });
});
/****************
 function to toggle the the free 2 months text and change the colors for the monthly and yearly text for the switch
 ********************/
function setYearly() {
  let plan_classes = ["plan-arcade", "plan-advance", "plan-pro"];

  let base_plan_cost = 90;
  for (const index in plan_classes) {
    // changing the yr and free two months text
    let current_element = plan_classes[index];
    find(
      `.${current_element} span small`
    ).textContent = `$${base_plan_cost}/yr`;
    // changing the data plan attribute to years
    find(`.${current_element}`).setAttribute("data-plan", base_plan_cost);
    find(`.${current_element} span p:nth-child(3)`).style.display = "block";

    base_plan_cost += 30;
  }
  document.querySelector(".monthly").style.color = "hsl(231, 11%, 63%)";
  document.querySelector(".yearly").style.color = "hsl(213, 96%, 18%)";
  findAll("#step2 section span p:nth-child(3)").forEach((e) => {
    e.style.display = "block";
  });
  finalEstimates.plan_is_monthly = false;
  selectedPlan();
  setAddOns();
  updateTotalValues();
}
function setMonthly() {
  let plan_classes = ["plan-arcade", "plan-advance", "plan-pro"];
  let base_plan_cost = 9;
  for (const index in plan_classes) {
    let current_element = plan_classes[index];
    find(
      `.${current_element} span small`
    ).textContent = `$${base_plan_cost}/mo`;
    // changing the data plan attribute the months
    find(`.${current_element}`).setAttribute("data-plan", base_plan_cost);

    find(`.${current_element} span p:nth-child(3)`).style.display = "none";
    base_plan_cost += 3;
  }
  document.querySelector(".monthly").style.color = "hsl(213, 96%, 18%)";
  document.querySelector(".yearly").style.color = "hsl(231, 11%, 63%)";
  findAll("#step2 section span p:nth-child(3)").forEach((e) => {
    e.style.display = "none";
  });

  finalEstimates.plan_is_monthly = true;
  selectedPlan();

  setAddOns();
  updateTotalValues();
}
// adding an event listener for all add ons when clicked
findAll("#step3 .add_on").forEach((add_on) => {
  add_on.addEventListener("click", () => {
    add_on.classList.toggle("selected");
    // changing the variables to hold which add ons have been selected so far
    // these variables which hold the boolean true  if they have been selected
    let one = find("#step3 .add_on_one").classList.contains("selected");
    let two = find("#step3 .add_on_two").classList.contains("selected");
    let three = find("#step3 .add_on_three").classList.contains("selected");
    //  updating final estimation object with current odd ons selected
    finalEstimates.add_ons[0] = one;
    finalEstimates.add_ons[1] = two;
    finalEstimates.add_ons[2] = three;
    updateTotalValues();
  });
});
setYearly();
let pages = ["#step1", "#step2", "#step3", "#step4"];
let currentPage = 1;
function goToNext() {
  if (!validate()) {
    return;
  }
  currentPage++;
  find(".next").textContent = currentPage === 4 ? "Confirm" : "Next Step";
  if (currentPage == 5) {
    find(".final").style.display = "block";
    find(".next-button").style.display = "none";
  } else {
    find(`${pages[currentPage - 1]}`).scrollIntoView();
    currentPage == 1
      ? find(".next-button .go-back").classList.add("canHide")
      : find(".next-button .go-back").classList.remove("canHide");
  }
  setRightBack(currentPage);
}
function goToBack() {
  currentPage--;
  find(".next").textContent = currentPage === 4 ? "Confirm" : "Next Step";

  console.log(currentPage);
  find(`${pages[currentPage - 1]}`).scrollIntoView();
  currentPage == 1
    ? find(".next-button .go-back").classList.add("canHide")
    : find(".next-button .go-back").classList.remove("canHide");
  setRightBack(currentPage);
}
find(".next").addEventListener("click", goToNext);
find(".go-back ").addEventListener("click", goToBack);
const setPage = (x) => {
  currentPage = x;
  currentPage == 1
    ? find(".next-button .go-back").classList.add("canHide")
    : find(".next-button .go-back").classList.remove("canHide");
  setRightBack(currentPage);
};
const setRightBack = (page = 1, target) => {
  if (page == 1) {
    target = ".one";
  } else if (page == 2) {
    target = ".two";
  } else if (page == 3) {
    target = ".three";
  } else {
    target = ".four";
  }
  findAll(".currentPageNumber").forEach((e) => {
    e.classList.remove("clicked");
  });
  find(".next").textContent = currentPage === 4 ? "Confirm" : "Next Step";
  find(target).classList.add("clicked");
};
setRightBack();
const validate = () => {
  let name = find("#name").value;
  let number = find("#number").value;
  let email = find("#email").value;
  if (name == "") {
    find(".name").classList.add("error-container");
  } else {
    find(".name").classList.remove("error-container");
  }
  if (email == "") {
    find(".email").classList.add("error-container");
  } else {
    find(".email").classList.remove("error-container");
  }
  if (number == "") {
    find(".number").classList.add("error-container");
  } else {
    find(".number").classList.remove("error-container");
  }
  if (number != "" && name != "" && email != "") {
    return true;
  } else {
    return false;
  }
};
