#include <iostream>
#include <vector>
#include <algorithm>
#include <map>
#include <string>
using namespace std;

enum class ServiceType
{
    EmergencyCare,
    Scheduled,
    Diagnostics,
    Pharmacy,
    DineIn,
    Takeaway,
    Delivery
};
enum class Priority
{
    Critical,
    High,
    Medium,
    Low,
    VIP,
    Reservation,
    WalkIn,
    Online
};

struct Process
{
    int id;
    ServiceType service;
    Priority priority;
    int score;
};

// Helper to convert enums to readable strings
string serviceToStr(ServiceType s)
{
    switch (s)
    {
    case ServiceType::EmergencyCare:
        return "EmergencyCare";
    case ServiceType::Scheduled:
        return "Scheduled";
    case ServiceType::Diagnostics:
        return "Diagnostics";
    case ServiceType::Pharmacy:
        return "Pharmacy";
    case ServiceType::DineIn:
        return "DineIn";
    case ServiceType::Takeaway:
        return "Takeaway";
    case ServiceType::Delivery:
        return "Delivery";
    default:
        return "Unknown";
    }
}

string priorityToStr(Priority p)
{
    switch (p)
    {
    case Priority::Critical:
        return "Critical";
    case Priority::High:
        return "High";
    case Priority::Medium:
        return "Medium";
    case Priority::Low:
        return "Low";
    case Priority::VIP:
        return "VIP";
    case Priority::Reservation:
        return "Reservation";
    case Priority::WalkIn:
        return "WalkIn";
    case Priority::Online:
        return "Online";
    default:
        return "Unknown";
    }
}

int getScore(ServiceType s, Priority p)
{
    map<ServiceType, int> serviceScore = {
        {ServiceType::EmergencyCare, 200},
        {ServiceType::Scheduled, 100},
        {ServiceType::Diagnostics, 80},
        {ServiceType::Pharmacy, 60},
        {ServiceType::DineIn, 90},
        {ServiceType::Takeaway, 70},
        {ServiceType::Delivery, 50}};

    map<Priority, int> priorityScore = {
        {Priority::Critical, 150},
        {Priority::High, 100},
        {Priority::Medium, 50},
        {Priority::Low, 25},
        {Priority::VIP, 120},
        {Priority::Reservation, 90},
        {Priority::WalkIn, 60},
        {Priority::Online, 30}};

    return int(0.7 * serviceScore[s] + 0.3 * priorityScore[p]);
}

int main()
{
    string type, name;
    cout << "Select System:\n";
    cout << "1. hospital\n";
    cout << "2. restaurant\n";
    cout << "Enter your choice (1 or 2): ";
    int choice;
    cin >> choice;

    if (choice == 1)
        type = "hospital";
    else if (choice == 2)
        type = "restaurant";
    else
    {
        cout << "Invalid choice.\n";
        return 1;
    }

    cout << "Customer name: ";
    cin >> name;

    int n;
    cout << "Number of processes: ";
    cin >> n;

    vector<Process> v(n);
    for (int i = 0; i < n; ++i)
    {
        int s, p;
        cout << "\nProcess " << i + 1 << ":\n";

        if (type == "hospital")
        {
            cout << "Select Service Type:\n";
            cout << "1. EmergencyCare\n";
            cout << "2. Scheduled\n";
            cout << "3. Diagnostics\n";
            cout << "4. Pharmacy\n";
            cout << "Select Priority:\n";
            cout << "1. Critical\n";
            cout << "2. High\n";
            cout << "3. Medium\n";
            cout << "4. Low\n";
        }
        else
        {
            cout << "Select Service Type:\n";
            cout << "1. DineIn\n";
            cout << "2. Takeaway\n";
            cout << "3. Delivery\n";
            cout << "Select Priority:\n";
            cout << "1. VIP\n";
            cout << "2. Reservation\n";
            cout << "3. WalkIn\n";
            cout << "4. Online\n";
        }

        cout << "Enter Service(1-4) and Priority(1-4): ";
        cin >> s >> p;

        // Input validation
        if ((type == "hospital" && (s < 1 || s > 4 || p < 1 || p > 4)) ||
            (type == "restaurant" && (s < 1 || s > 3 || p < 1 || p > 4)))
        {
            cout << "Invalid input. Try again.\n";
            return 1;
        }

        v[i].id = i + 1;
        v[i].service = static_cast<ServiceType>((type == "hospital") ? s - 1 : s + 3 - 1);
        v[i].priority = static_cast<Priority>((type == "hospital") ? p - 1 : p + 3);
        v[i].score = getScore(v[i].service, v[i].priority);
    }

    sort(v.begin(), v.end(), [](auto &a, auto &b)
         { return a.score > b.score || (a.score == b.score && a.id < b.id); });

    cout << "\nExecution Order (sorted by score):\n";
    for (int i = 0; i < n; ++i)
    {
        cout << name << "-" << v[i].id
             << " | Service: " << serviceToStr(v[i].service)
             << " | Priority: " << priorityToStr(v[i].priority)
             << " | Score: " << v[i].score << '\n';
    }

    return 0;
}
