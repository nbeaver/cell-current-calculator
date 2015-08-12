function calculate_current() {
    var mg_electrode = parseFloat(document.getElementById("mg_electrode").value);
    var mg_current_collector = parseFloat(document.getElementById("mg_current_collector").value);
    var percent_active_material = parseFloat(document.getElementById("percent_active_material").value);
    var percent_carbon = parseFloat(document.getElementById("percent_carbon").value);
    var mg_carbon = parseFloat(document.getElementById("mg_carbon").value);
    var capacity_active_material = parseFloat(document.getElementById("capacity_active_material").value);
    var capacity_carbon = parseFloat(document.getElementById("capacity_carbon").value);
    var hours_charge_time = parseFloat(document.getElementById("hours_charge_time").value);

    var mg_active_material = (mg_electrode - mg_current_collector) * (percent_active_material/100.0);
    document.getElementById("mg_active_material").value = mg_active_material;
    var mg_carbon = (mg_electrode - mg_current_collector) * (percent_carbon/100.0);
    document.getElementById("mg_carbon").value = mg_carbon;

    const A_to_mA = 1.0/1000.0;
    var mA_active_material = A_to_mA * capacity_active_material * mg_active_material / hours_charge_time;
    document.getElementById("mA_active_material").value = mA_active_material;
    var mA_carbon = A_to_mA * capacity_carbon * mg_carbon / hours_charge_time;
    document.getElementById("mA_carbon").value = mA_carbon;
    var mA_total = mA_active_material + mA_carbon;
    document.getElementById("mA_total").value = mA_total;
}

window.onload = function() {
    var input_ids = new Array("mg_electrode", "mg_current_collector", "percent_active_material", "percent_carbon", "mg_carbon", "capacity_active_material", "capacity_carbon", "hours_charge_time");
    var i;
    for (i=0; i<input_ids.length; i++) {
        document.getElementById(input_ids[i]).addEventListener('input', calculate_current);
    }
}
