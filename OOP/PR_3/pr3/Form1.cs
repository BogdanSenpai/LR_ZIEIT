using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace pr3
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            insertToGrid(this.dataGridView1, parsedbFile("../../Properties/db1.txt"));
            insertToGrid(this.dataGridView2, parsedbFile("../../Properties/db2.txt"));
            insertToGrid(this.dataGridView3, parsedbFile("../../Properties/db3.txt"));
        }

        static void insertToGrid(DataGridView view, String[][] lines)
        {
            for (int i = 0; i < lines.Length; ++i)
            {
                view.Rows.Insert(i, lines[i][0], lines[i][1]);
            }
        }

        static String[][] parsedbFile(String path)
        {
            String text = File.ReadAllText(path);
            String[] lineSep = { "\r\n", "\n" };
            String[] strlist = text.Split(lineSep, StringSplitOptions.RemoveEmptyEntries);

            String[] cellSep = { "," };
            // :/
            String[][] res = new String[][] { new String[] {  "" }, new String[] { "" }, new String[] { "" } };
            for (int i = 0; i < strlist.Length; ++i)
            {
                res[i] = strlist[i].Split(cellSep, StringSplitOptions.RemoveEmptyEntries);
            }
            return res;
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void dataGridView2_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }
    }
}
