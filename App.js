//////////////////////////////////////////////////////////// opening form////////////////////////////////////////////////////////////////////////
let Button_1 = document.querySelector(".addbutton");
let details_Form = document.querySelector(".FormCard");
let MAin = document.querySelector("#Main");
let EditVar = null;

Button_1.addEventListener("click", function () {

    SaveForm.reset()
    EditVar = null

    MAin.classList.add("active")
    details_Form.classList.add("active");
    // console.log("button clicked");
});
window.addEventListener("click", function (event) {
    if (!details_Form.contains(event.target) &&
        !Button_1.contains(event.target) &&
        !event.target.closest(".Edit_Button")) {

        details_Form.classList.remove("active");
        MAin.classList.remove("active")

    }
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Button_1.addEventListener("click", function () {
//     MAin.classList.add("active")
// })
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EditButton.addEventListener("click", function () {
//     MAin.classList.add("active")
// })

// MAin.addEventListener("click", function (event) {

//     if (MAin.contains(event.target) && !Button_1.contains(event.target)&& !Edit_Button.contains(event.target)) {

//     }
// })
////////////////////////////////////////////////////////  getting form values///////////////////////////////////////////////////////
const FormExpense = document.querySelector("#Expense");
const FormIncome = document.querySelector("#Income");
const FormTitle = document.querySelector("#Title");
const FormAmount = document.querySelector("#Amount");
const FormCategorySelect = document.querySelector("#CategorySelect_1");
const FormDate = document.querySelector("#Date");
const FormTextinput = document.querySelector("#Textinput");
const FormButtons = document.querySelector("#Buttons");
///////////////////////////////////////////////
let BoxSaving;
let Getting = localStorage.getItem("BoxSaving")

if (Getting == null) {
    BoxSaving = [];
}
else {
    BoxSaving = JSON.parse(Getting)
}
/////////////////////////////////////////////////Dashboard Saving//////////////////////////////////////////////////////////////////////
function UpdateDash() {
    const GetBalance = document.querySelector("#TotalBalance");
    const GetIncome = document.querySelector("#TotalIncome");
    const GetExpense = document.querySelector("#TotalExpense");
    const GetTransaction = document.querySelector("#TotalTransactions");

    const Calculatelen = BoxSaving.length
    GetTransaction.textContent = Calculatelen
    // console.log(Calculatelen)

    let initNumber = 0;
    BoxSaving.forEach(function (Transaction) {
        if (Transaction.type === "Income") {
            initNumber = initNumber + Transaction.amount
        }
    })
    GetIncome.textContent = initNumber

    let initNumberExp = 0;
    BoxSaving.forEach(function (Transaction) {
        if (Transaction.type === "Expense") {
            initNumberExp = initNumberExp + Transaction.amount
        }
    })
    GetExpense.textContent = initNumberExp

    // let BalanceCalc = 0;

    const BalanceCalc = initNumber - initNumberExp;
    GetBalance.textContent = BalanceCalc

}
UpdateDash()
/////////////////////////////////////////////////Dashboard Saving End//////////////////////////////////////////////////////////////////////

function Row_Func(Transaction) {
    // const IndexCalculate = BoxSaving.indexOf(Transaction);
    const SavedList = document.createElement("div");
    SavedList.classList.add("userValues")
    const userValuesList = document.querySelector("#TransactionsList")


    const DateValue = document.createElement("P");
    DateValue.classList.add("DateBox");
    SavedList.appendChild(DateValue)
    DateValue.textContent = Transaction.date

    const TitleValue = document.createElement("p");
    TitleValue.classList.add("TitleBox");
    SavedList.appendChild(TitleValue);
    TitleValue.textContent = Transaction.title;

    const CategoryValue = document.createElement("p");
    CategoryValue.classList.add("CategoryBox");
    SavedList.appendChild(CategoryValue);
    CategoryValue.textContent = Transaction.category;

    const TypeValue = document.createElement("p");
    TypeValue.classList.add("TypeBox");
    SavedList.appendChild(TypeValue);
    TypeValue.textContent = Transaction.type;

    const AmountValue = document.createElement("p");
    AmountValue.classList.add("AmountBox");
    SavedList.appendChild(AmountValue);
    AmountValue.textContent = Transaction.amount;

    const DeleteButton = document.createElement("button");
    DeleteButton.classList.add("Delete_Button");
    DeleteButton.textContent = "Delete";
    SavedList.appendChild(DeleteButton);

    DeleteButton.addEventListener("click", function () {
        // confirm("Transaction Will Deleted Permanently")
        if (confirm("Transaction Will Deleted Permanently")) {

            SavedList.remove()
            BoxSaving.splice(BoxSaving.indexOf(Transaction), 1)
            localStorage.setItem("BoxSaving", JSON.stringify(BoxSaving))
            UpdateDash()
        }
if (BoxSaving.length === 0) {
    const NoTransaction = document.createElement("h3");
    NoTransaction.textContent = "ADD YOUR FIRST TRANSACTION TO SEE THE HISTORY";
    NoTransaction.classList.add("NoResult");
    userValuesList.append(NoTransaction);
}
    })

    const EditButton = document.createElement("button");
    EditButton.classList.add("Edit_Button")
    EditButton.textContent = "Edit"
    SavedList.appendChild(EditButton)

    EditButton.addEventListener("click", function () {

        EditVar = Transaction;

        details_Form.classList.add("active");
        MAin.classList.add("active");

        FormTitle.value = Transaction.title;
        FormAmount.value = Transaction.amount;
        FormCategorySelect.value = Transaction.category;
        FormDate.value = Transaction.date;
        FormTextinput.value = Transaction.description;

        FormExpense.checked = Transaction.type === "Expense";
        FormIncome.checked = Transaction.type === "Income";
        // console.log("janan")
        // const TTTTTT = Transaction.title
        // const TTTTTT = FormTitle.value
        // console.log(TTTTTT)

    })
    userValuesList.appendChild(SavedList);


}
///////////////////////////////////////////////////////////////////// Search ////////////////////////////////////////////
let SearchInput = document.querySelector("#searchinput");
SearchInput.addEventListener("input", function () {
    const SearchValue = SearchInput.value;
    let SearchVAr = BoxSaving.filter(function (Transaction) {
        const Result_Search = Transaction.title.toLowerCase().includes(SearchValue);
        return (Result_Search)
    });
    const userValuesList = document.querySelector("#TransactionsList");
    userValuesList.innerHTML = "";
    if (SearchVAr.length === 0) {
        // userValuesList.textContent = "NO TRANSACTION FOUND"
        const NoTransaction = document.createElement("h3");
        NoTransaction.textContent = "NO TRANSACTION FOUND";
        NoTransaction.classList.add("NoResult");
        userValuesList.append(NoTransaction)
    }
    SearchVAr.forEach(function (Transaction) {
        Row_Func(Transaction)
    })

});
///////////////////////////////////////////////////////////////////// First filter ////////////////////////////////////////////
let FilterKeyword = document.querySelector("#CategorySelect");
FilterKeyword.addEventListener("change", function () {

    const Selecting = FilterKeyword.value;
    if (Selecting === "All Transaction") {
        const userValuesList = document.querySelector("#TransactionsList");
        userValuesList.innerHTML = "";
        BoxSaving.forEach(function (Transaction) {
            Row_Func(Transaction)

        })
    }
    else {

        let filter_Values = BoxSaving.filter(function (Transaction) {

            return Transaction.type === Selecting;

        })
        const userValuesList = document.querySelector("#TransactionsList");
        userValuesList.innerHTML = "";
        if (filter_Values.length === 0) {
            const NoTransaction = document.createElement("h3");
            NoTransaction.textContent = "NO TRANSACTION FOUND";
            NoTransaction.classList.add("NoResult");
            userValuesList.append(NoTransaction)
        }
        else {
            filter_Values.forEach(function (Transaction) {
                Row_Func(Transaction)

            })
        }
    }


})
///////////////////////////////////////////////////////////////////// Second filter ////////////////////////////////////////////

let SecondFilter = document.querySelector("#CategorySelect_2")

SecondFilter.addEventListener("change", function () {
    const userValuesList = document.querySelector("#TransactionsList");
    userValuesList.innerHTML = "";
    const SecondFValues = SecondFilter.value;
    if (SecondFValues === "All Categories") {
        //  const userValuesList = document.querySelector("#TransactionsList");
        // userValuesList.innerHTML = "";
        BoxSaving.forEach(function (Transaction) {
            Row_Func(Transaction)
        })
    }
    else {
        let Filter_Value2 = BoxSaving.filter(function (Transaction) {
            return Transaction.category === SecondFValues;

        })
        if (Filter_Value2.length === 0) {
            const userValuesList = document.querySelector("#TransactionsList");
            userValuesList.innerHTML = "";
            const NoTransaction = document.createElement("h3");
            NoTransaction.textContent = "NO TRANSACTION FOUND";
            NoTransaction.classList.add("NoResult");
            userValuesList.append(NoTransaction)
        }
        else {
            //     const userValuesList = document.querySelector("#TransactionsList");
            // userValuesList.innerHTML = "";
            Filter_Value2.forEach(function (Transaction) {
                Row_Func(Transaction)

            })
        }
    }

})
///////////////////////////////////////////////////////////////////// Third filter ////////////////////////////////////////////
let ThirdFilter = document.querySelector("#CategorySelect_3")

ThirdFilter.addEventListener("change", function () {
    const ThirdFValue = ThirdFilter.value;
    const userValuesList = document.querySelector("#TransactionsList");
    userValuesList.innerHTML = "";
    if (ThirdFValue === "OverAll") {
        BoxSaving.forEach(function (Transaction) {
            Row_Func(Transaction)
        })
    }
    else if (ThirdFValue === "Newest First"){
        let copyOfFilter = [...BoxSaving];
        copyOfFilter.sort(function (A , B) {
            return new Date(B.date) - new Date(A.date)
            
        })
        copyOfFilter.forEach(function (Transaction) {
    Row_Func(Transaction);
});
    }
    else if (ThirdFValue === "Oldest First") {
        let copyOfFilter_2 = [...BoxSaving];
        copyOfFilter_2.sort(function (A , B) {
            return new Date(A.date) - new Date(B.date);
        })
        copyOfFilter_2.forEach(function (Transaction) {
            Row_Func(Transaction)
            
        })
    }
    else if (ThirdFValue === "Low To High") {
        let copyOfFilter_3 = [...BoxSaving];
        copyOfFilter_3.sort(function (A , B) {
            return A.amount - B.amount
        })
        copyOfFilter_3.forEach(function (Transaction) {
            Row_Func(Transaction)
        })
    }
    else if(ThirdFValue === "High To Low"){
        let copyOfFilter_4 = [...BoxSaving]
        copyOfFilter_4.sort(function (A , B) {
            return B.amount - A.amount
        })
        copyOfFilter_4.forEach(function (Transaction) {
            Row_Func(Transaction)
        })
    }
   console.log(ThirdFValue)

})



const SaveForm = document.querySelector("#Form");
SaveForm.addEventListener("submit", function (event) {

    event.preventDefault()
    // const GetType = FormType.value;
    const GetTitle = FormTitle.value;
    const GetAmount = FormAmount.value;
    const GetCategory = FormCategorySelect.value;
    const GetDate = FormDate.value;
    const GetDiscription = FormTextinput.value;
    /////////////////////////////////////////////////////////////////////
    const GetType = document.querySelector('.select input[name="choice"]:checked').value
    const Transaction = {
        type: GetType,
        title: GetTitle,
        amount: Number(GetAmount),
        category: GetCategory,
        date: GetDate,
        description: GetDiscription
    };
    if (EditVar === null) {
        BoxSaving.push(Transaction)
        // Row_Func(Transaction)

    }
    else {
        EditVar.type = GetType;
        EditVar.title = GetTitle;
        EditVar.amount = Number(GetAmount);
        EditVar.category = GetCategory;
        EditVar.date = GetDate;
        EditVar.description = GetDiscription;
    }

    ///////////////////////////////////////////////LocalStorage////////////////////////////////////
    localStorage.setItem("BoxSaving", JSON.stringify(BoxSaving));

    const userValuesList = document.querySelector("#TransactionsList");
    userValuesList.innerHTML = "";

    BoxSaving.forEach(function (Transaction) {
        Row_Func(Transaction);
        UpdateDash()

    });
    // console.log(localStorage.getItem("BoxSaving"));
    EditVar = null
    SaveForm.reset()
    details_Form.classList.remove("active");
    MAin.classList.remove("active");
    // console.log(BoxSavng)
})

///////////////////////

if (BoxSaving.length === 0) {
    const userValuesList = document.querySelector("#TransactionsList")
    const NoTransaction = document.createElement("h3");
    NoTransaction.textContent = "ADD YOUR FIRST TRANSACTION";
    NoTransaction.classList.add("NoResult");
    userValuesList.append(NoTransaction)

}
else {
    BoxSaving.forEach(function (Transaction) {
        Row_Func(Transaction)

    })
}
UpdateDash()



///////////////////////


///////////////////////////////////////////////
