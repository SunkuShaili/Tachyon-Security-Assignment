function isDeviceReachable() {
    return Math.random() < 0.5;
}


function loadDevices() {
    const deviceSelect = document.getElementById('device-select');
    deviceSelect.innerHTML = ''; // Clear previous options

    const devices = JSON.parse(localStorage.getItem('devices')) || [];
    devices.forEach((device, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${device.name} (${device.ip})`;
        deviceSelect.appendChild(option);
    });

    if (devices.length === 0) {
        const noDeviceOption = document.createElement('option');
        noDeviceOption.textContent = 'No devices registered';
        noDeviceOption.disabled = true;
        deviceSelect.appendChild(noDeviceOption);
    }
}

document.getElementById('device-registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const deviceName = document.getElementById('device-name').value;
    const ipAddress = document.getElementById('device-ip').value;
    const password = document.getElementById('device-password').value;

    const devices = JSON.parse(localStorage.getItem('devices')) || [];
    devices.push({ name: deviceName, ip: ipAddress, password: password });
    localStorage.setItem('devices', JSON.stringify(devices));

    alert('Device registered successfully!');
    loadDevices(); 
});
document.getElementById('device-availability-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedIndex = document.getElementById('device-select').value;
    const enteredPassword = document.getElementById('check-password').value;

    const devices = JSON.parse(localStorage.getItem('devices')) || [];

    if (devices[selectedIndex]) {
        const selectedDevice = devices[selectedIndex];

        const resultElement = document.getElementById('result');
        resultElement.className = 'result'; 

        if (selectedDevice.password === enteredPassword) {
            const reachable = isDeviceReachable();
            if (reachable) {
                resultElement.textContent = 'Device is Reachable';
                resultElement.classList.add('reachable');
            } else {
                resultElement.textContent = 'Device is Not Reachable';
                resultElement.classList.add('unreachable');
            }
        } else {
            resultElement.textContent = 'Incorrect Password';
            resultElement.classList.add('error');
        }
    } else {
        document.getElementById('result').textContent = 'No device selected';
    }
});
window.onload = function() {
    loadDevices();
};
