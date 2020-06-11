using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PR4
{
    class Program
    {
        class User
        {
            public string name;
            public string lastName;
            public string login;
            public string password;
        }

        static string dbPath = "../../Properties/db.txt";

        static void Main(string[] args)
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("1 - Registaration\n2 - Login");
                string input = Console.ReadLine();
                if (input == "1")
                {
                    reg();
                }
                else if (input == "2")
                {
                    login();
                }
                else
                {
                    Console.WriteLine("Malformed input :/");
                    Console.ReadKey(true);
                }
            }
        }

        static void reg()
        {
            Console.WriteLine("Name:");
            string name = Console.ReadLine();
            Console.WriteLine("Last name:");
            string lastName = Console.ReadLine();
            Console.WriteLine("Login:");
            string login = Console.ReadLine();
            Console.WriteLine("Password:");
            string password = Console.ReadLine();

            string[] user = { name, lastName, login, encode(password) };
            string[] toWrite = { string.Join(",", user) };
            File.AppendAllLines(dbPath, toWrite);
            Console.WriteLine("User saved!");
            Console.ReadKey(true);
        }

        static void login()
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("Enter Login:");
                var login = Console.ReadLine();
                Console.WriteLine("Enter password:");
                var password = Console.ReadLine();
                var lines = File.ReadLines(dbPath);
                var userIndex = getUserIndexByCreads(lines, login, password);
                if (userIndex == -1)
                {
                    Console.WriteLine("User is not found!@");
                    Console.ReadKey(true);
                } else
                {
                    var user = fromLine(lines.ToArray()[userIndex]);
                    userMenu(user);
                    break;
                }
            }
        }

        static void userMenu(User user)
        {
            while (true)
            {
                Console.Clear();
                Console.WriteLine("Hello " + user.name + " " + user.lastName + "!");
                Console.WriteLine("1 - Log out");
                string input = Console.ReadLine();
                if (input == "1")
                {
                    break;
                }
                else
                {
                    Console.WriteLine("Malformed input :/");
                    Console.ReadKey(true);
                }
            }
        }

        static int getUserIndexByCreads(IEnumerable<string> lines, string login, string password)
        {
            string[] arr = lines.ToArray();
            for (var i = 0; i < arr.Length; ++i)
            {
                var user = fromLine(arr[i]);
                if (user.login == login && user.password == password)
                {
                    return i;
                }
            }
            return -1;
        }

        static User fromLine(string line)
        {
            String[] cellSep = { "," };
            string[] userData = line.Split(cellSep, StringSplitOptions.RemoveEmptyEntries);
            var user = new User();
            user.name = userData[0];
            user.lastName = userData[1];
            user.login = userData[2];
            user.password = decode(userData[3]);
            return user;
        }

        static string encode(string text) {
            var bytes = System.Text.Encoding.UTF8.GetBytes(text);
            return System.Convert.ToBase64String(bytes);
        }

        public static string decode(string text)
        {
            var encodedBytes = System.Convert.FromBase64String(text);
            return System.Text.Encoding.UTF8.GetString(encodedBytes);
        }

        static String[][] parsedbFile(String path)
        {
            String text = File.ReadAllText(path);
            String[] lineSep = { "\r\n", "\n" };
            String[] strlist = text.Split(lineSep, StringSplitOptions.RemoveEmptyEntries);

            String[] cellSep = { "," };
            // :/
            String[][] res = new String[4][];
            for (int i = 0; i < strlist.Length; ++i)
            {
                res[i] = strlist[i].Split(cellSep, StringSplitOptions.RemoveEmptyEntries);
            }
            return res;
        }
    }
}
