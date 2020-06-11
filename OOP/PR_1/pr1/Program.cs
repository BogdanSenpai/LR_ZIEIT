using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PR1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Let's get factorial!");
            Console.ReadLine();
            getFactorial();

            Console.WriteLine("Let's find max item in array!");
            Console.ReadLine();
            findMaxItem();

            Console.WriteLine("Let's swap two items in array!");
            Console.ReadLine();
            swapTwoItemsInArray();

            Console.WriteLine("Let's find NOD of 3045 & 256!");
            Console.ReadLine();
            nod(3045, 256);
        }

        static void getFactorial()
        {
            for (int i = 2; i <= 13; ++i)
            {
                int res = 1;
                for (int k = i; k > 1; --k)
                {
                    res *= k;
                }
                Console.WriteLine(i + "! = " + res);
            }
            Console.ReadLine();
        }

        static void findMaxItem()
        {
            int[] arr = { 4, 1, 23, 5, 12, 4, 1, 67, 12 };
            int max = arr[0];
            for (int i = 1; i < arr.Length; ++i)
            {
                if (arr[i] > max)
                {
                    max = arr[i];
                }
            }
            Console.WriteLine("Max value is " + max);
            Console.ReadLine();
        }

        static void swapTwoItemsInArray() {
            int[] arr = { 4, 1 };
            Console.WriteLine("Before " + arr[0] + ',' + arr[1]);
            int tmp = arr[0];
            arr[0] = arr[1];
            arr[1] = tmp;
            Console.WriteLine("After " + arr[0] + ',' + arr[1]);
            Console.ReadLine();
        }

        static int nod(int x, int y)
        {
            while (x != y)
            {
                if (x > y)
                    x = x - y;
                else
                    y = y - x;
            }
            Console.WriteLine(x);
            Console.ReadLine();
        }
    }
}
