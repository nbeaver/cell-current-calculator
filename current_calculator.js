function calculate_current() {
    var mg_electrode = parseFloat(document.getElementById("mg_electrode").value);
    var mg_current_collector = parseFloat(document.getElementById("mg_current_collector").value);
    var percent_active_material = parseFloat(document.getElementById("percent_active_material").value);
    var percent_carbon = parseFloat(document.getElementById("percent_carbon").value);
    var mg_carbon = parseFloat(document.getElementById("mg_carbon").value);
    var capacity_active_material = parseFloat(document.getElementById("capacity_active_material").value);
    var capacity_carbon = parseFloat(document.getElementById("capacity_carbon").value);
    var hours_charge_time = parseFloat(document.getElementById("hours_charge_time").value);
    var electrode_area = parseFloat(document.getElementById("electrode_area").value);

    var mg_laminate = (mg_electrode - mg_current_collector);
    document.getElementById("mg_laminate").value = mg_laminate;
    var mg_active_material = mg_laminate * (percent_active_material/100.0);
    document.getElementById("mg_active_material").value = mg_active_material;
    var mg_carbon = mg_laminate * (percent_carbon/100.0);
    document.getElementById("mg_carbon").value = mg_carbon;

    const A_to_mA = 1.0/1000.0;
    const mg_to_g = 1.0/1000.0;
    var mA_per_g_active_material = capacity_active_material / hours_charge_time;
    document.getElementById("mA_per_g_active_material").value = mA_per_g_active_material;
    var mA_active_material = A_to_mA * capacity_active_material * mg_active_material / hours_charge_time;
    document.getElementById("mA_active_material").value = mA_active_material;
    var mA_carbon = A_to_mA * capacity_carbon * mg_carbon / hours_charge_time;
    document.getElementById("mA_carbon").value = mA_carbon;
    var mA_total = mA_active_material + mA_carbon;
    document.getElementById("mA_total").value = mA_total;

    document.getElementById("mass_loading_laminate").value = mg_active_material/electrode_area;
    document.getElementById("mass_loading_active").value = mg_laminate/electrode_area;
    document.getElementById("current_density_active").value = mA_active_material/electrode_area;
    document.getElementById("current_density_carbon").value = mA_carbon/electrode_area;
    document.getElementById("current_density_total").value = mA_total/electrode_area;
}

function table_to_csv(table) {
    var table_string = "";
    var row_delimiter = "\n";
    var column_delimiter = ",";
    // http://stackoverflow.com/a/3065389/1608986
    for (var i=0, row; row=table.rows[i]; i++) {
        for (var j=0, col; col=row.cells[j]; j++) {
            if (j < row.cells.length - 1) {
                table_string += col.textContent + column_delimiter;
            }
            else {
                // Last item in row.
                if (col.childElementCount > 0) {
                    table_string += col.children[0].value;
                }
                else {
                    table_string += col.textContent;
                }
            }
        }
        if (i < table.rows.length - 1) {
            table_string += row_delimiter;
        }
    }
    return table_string;
}

function download_csv() {
    var table = document.getElementById("calculator_table");
    var tempAnchor = window.document.createElement('a');
    CSVBlob = new Blob([table_to_csv(table)], {type: 'text/csv'});
    tempAnchor.href = window.URL.createObjectURL(CSVBlob);
    tempAnchor.download = document.getElementById("csv_filename").value;
    tempAnchor.style.display = 'none';
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    document.body.removeChild(tempAnchor);
}

window.onload = function() {
    calculate_current();
    var input_ids = new Array("mg_electrode", "mg_current_collector", "percent_active_material", "percent_carbon", "mg_carbon", "capacity_active_material", "capacity_carbon", "hours_charge_time", "electrode_area");
    var i;
    for (i=0; i<input_ids.length; i++) {
        document.getElementById(input_ids[i]).addEventListener('input', calculate_current);
    }
    document.getElementById("download_csv_button").addEventListener('click', download_csv);
}
