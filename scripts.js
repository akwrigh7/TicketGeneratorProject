const supabaseUrl = "https://balrmrqrjdddtpedteut.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbHJtcnFyamRkZHRwZWR0ZXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMTY5MjksImV4cCI6MjA1NjY5MjkyOX0.AdoIeBVCpTj93-VzfzcgQRxG2pH1hem86sHLvWHtWjE";

// Create the Supabase client
const database = supabase.createClient(supabaseUrl, supabaseKey);

// Example: Query data from a table called 'your_table_name'
async function fetchData() {
    const { data, error } = await database.from("generatorData").select("*");

    if (error) {
        console.error("Error fetching data:", error);
    } else {
        console.log("Data:", data);
    }

    function addInfo(name, email) {}
}

fetchData();
