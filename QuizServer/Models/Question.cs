﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizServer.Models
{
    public class Question
    {
        [Key]
        public int QnId { get; set; }

        [Column(TypeName ="nvarchar(250)")]
        public string QnInWordps { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string ImageUrl { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option1 { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option2 { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option3 { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Option4 { get; set; }

        public int Answer { get; set; }
    }
}
