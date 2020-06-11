using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace pr2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        static int sc = 0;

        private void button1_Click(object sender, EventArgs e)
        {
            this.BackgroundImage = Image.FromFile("../../Properties/spring.jpg");
            sc = 0;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.BackgroundImage = Image.FromFile("../../Properties/winter.jpg");
            sc = 0;
        }

        private void button3_Click(object sender, EventArgs e)
        {
            if (sc == 2)
            {
                this.BackgroundImage = Image.FromFile("../../Properties/secret.jpg");
            }
            else
            {
                this.BackgroundImage = Image.FromFile("../../Properties/fall.jpg");
                sc = 0;
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {
         
            this.BackgroundImage = Image.FromFile("../../Properties/summer.jpg");
            sc = 0;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
        }

        private void Form1_MouseClick(object sender, MouseEventArgs e)
        {
            if (e.Button == System.Windows.Forms.MouseButtons.Right)
            {
                sc = 1;
            }
        }

        private void Form1_MouseMove(object sender, MouseEventArgs e)
        {
            if (sc == 1)
            {

                if (e.X < button4.Location.X && e.Y < button4.Location.Y)
                {
                    sc = 2;
                }
            }
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }
    }
}
