var data = {
  formulars:[
    {
      name:"formular1", 
      rows:[
        {
          label:"Name", 
          type:"TextBox", 
          radioButtonLabels:[], 
          restrictions:"Mandatory"
        },
        {
          label:"Surname", 
          type:"TextBox", 
          radioButtonLabels:[], 
          restrictions:"Mandatory"
        },
        {
          label: "Relationship status",
          type: "RadioButton",
          radioButtonLabels:["married", "single", "complicated", "in relationship"], 
          restrictions:"None"
        }
      ]
    },
    {
      name:"formular2", 
      rows:[
        {
          label:"Name", 
          type:"TextBox", 
          radioButtonLabels:[], 
          restrictions:"Mandatory"
        },
        {
          label: "Older than 18 years",
          type: "CheckBox",
          radioButtonLabels:[], 
          restrictions: "None"
        }
      ]
    }
  ],
  versions: 
    [
      {
        version: "4",
        formularName: "formular1",
        versionData: 
          [
            "Lejla", "Dzafic", 3
          ]
      }
    ]
};