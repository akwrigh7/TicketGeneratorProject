// Initialize Supabase client
const supabaseUrl = "https://balrmrqrjdddtpedteut.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbHJtcnFyamRkZHRwZWR0ZXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMTY5MjksImV4cCI6MjA1NjY5MjkyOX0.AdoIeBVCpTj93-VzfzcgQRxG2pH1hem86sHLvWHtWjE";

// Create the Supabase client - this is the correct way to create it with the CDN version
const database = supabase.createClient(supabaseUrl, supabaseKey);

// Function to fetch data from Supabase
async function fetchData() {
    try {
        const { data, error } = await database
            .from("generatorData")
            .select("*");

        if (error) {
            console.error("Error fetching data:", error);
        } else {
            console.log("Data:", data);
        }
    } catch (err) {
        console.error("Unexpected error during fetch:", err);
    }
}

// Function to add information to Supabase
async function addInfo() {
    try {
        const fName = document.getElementById("fullName");
        const email = document.getElementById("email");
        const ghName = document.getElementById("ghName");

        if (await checkEmail(email.value)) {
            const { data, error } = await database
                .from("generatorData")
                .insert([
                    {
                        name: fName.value,
                        email: email.value,
                        github_username: ghName.value,
                    },
                ]);

            if (error) {
                console.error("Error inserting data:", error.message);
            } else {
                console.log(`Added ${fName.value} successfully.`);
                fName.value = "";
                email.value = "";
                ghName.value = "";
            }
        }
    } catch (err) {
        console.error("Unexpected error during insert:", err);
    }
}

async function checkEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(email);
    if (!emailRegex.test(email)) {
        alert("Invalid email format!");
        return false;
    }
    const { data, error } = await database
        .from("generatorData")
        .select("email")
        .eq("email", email);

    // If data is found, the email already exists
    if (data && data.length > 0) {
        alert("This email is already registered!");
        return false;
    }

    return true;
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    // Add event listener for the button
    const genBtn = document.getElementById("genBtn");
    genBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent form submission
        addInfo();
    });
});

//  && checkName(fName) && checkGH(ghName)
