@echo off
echo Testing Liquor Store Management System...
echo.

echo Checking if portable exe exists...
if exist "release\Liquor Store Management System 1.0.1 Portable.exe" (
    echo ✓ Portable exe found
) else (
    echo ✗ Portable exe not found
    goto :end
)

echo.
echo Checking if unpacked exe exists...
if exist "release\win-unpacked\Liquor Store Management System.exe" (
    echo ✓ Unpacked exe found
) else (
    echo ✗ Unpacked exe not found
    goto :end
)

echo.
echo Attempting to run unpacked version (this might show errors)...
echo Press any key to continue...
pause > nul
start "" "release\win-unpacked\Liquor Store Management System.exe"

echo.
echo Attempting to run portable version...
echo Press any key to continue...
pause > nul
start "" "release\Liquor Store Management System 1.0.1 Portable.exe"

:end
echo.
echo Test completed. Check if any windows opened or if you see error messages.
pause
