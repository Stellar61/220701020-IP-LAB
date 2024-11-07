import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/DisplayBooksServlet")
public class DisplayBooksServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    // Database connection details
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/LibraryDB";
    private static final String JDBC_USER = "root";
    private static final String JDBC_PASSWORD = "Falalala06??";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        displayBooks(request, response);
    }

    private void displayBooks(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            // Load and register JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establish connection to the database
            conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);

            // Create and execute SQL query
            String sql = "SELECT * FROM BOOK";
            stmt = conn.createStatement();
            rs = stmt.executeQuery(sql);

            // Generate HTML output
            out.println("<html><body>");
            out.println("<h2>Book List</h2>");
            out.println("<table border='1' cellpadding='10'>");
            out.println("<tr><th>Account no</th><th>Title</th><th>Author</th><th>Publisher</th><th>Edition</th><th>Price</th></tr>");

            while (rs.next()) {
                out.println("<tr>");
                out.println("<td>" + rs.getString("ACCNO") + "</td>");
                out.println("<td>" + rs.getString("TITLE") + "</td>");
                out.println("<td>" + rs.getString("AUTHOR") + "</td>");
                out.println("<td>" + rs.getString("PUBLISHER") + "</td>");
                out.println("<td>" + rs.getString("EDITION") + "</td>");
                out.println("<td>" + rs.getDouble("PRICE") + "</td>");
                out.println("</tr>");
            }

            out.println("</table>");
            out.println("</body></html>");

        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            out.println("<html><body>");
            out.println("<h2>Error: " + e.getMessage() + "</h2>");
            out.println("</body></html>");
        } finally {
            // Close resources
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
