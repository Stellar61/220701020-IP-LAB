import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/InsertBookServlet")
public class InsertBookServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    // Database connection details
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/LibraryDB";
    private static final String JDBC_USER = "root";
    private static final String JDBC_PASSWORD = "Falalala06??";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        Connection conn = null;
        PreparedStatement pstmt = null;

        String title = request.getParameter("title");
        String author = request.getParameter("author");
        String publisher = request.getParameter("publisher");
        String edition = request.getParameter("edition");
        String priceStr = request.getParameter("price");
        double price = priceStr != null && !priceStr.isEmpty() ? Double.parseDouble(priceStr) : 0;

        if (title == null || title.isEmpty() || author == null || author.isEmpty()) {
            out.println("<html><body>");
            out.println("<h2>Error: Title and Author are required fields.</h2>");
            out.println("</body></html>");
            return;
        }

        try {
            // Load and register JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establish connection to the database
            conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);

            // SQL Insert Statement
            String sql = "INSERT INTO BOOK (TITLE, AUTHOR, PUBLISHER, EDITION, PRICE) VALUES (?, ?, ?, ?, ?)";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, title);
            pstmt.setString(2, author);
            pstmt.setString(3, publisher);
            pstmt.setString(4, edition);
            pstmt.setDouble(5, price);

            int rowsInserted = pstmt.executeUpdate();
            if (rowsInserted > 0) {
                // Redirect to the DisplayBooksServlet to show the updated list
                response.sendRedirect("DisplayBooksServlet");
            } else {
                out.println("<html><body>");
                out.println("<h2>Error: No rows inserted.</h2>");
                out.println("</body></html>");
            }

        } catch (SQLException e) {
            e.printStackTrace();
            out.println("<html><body>");
            out.println("<h2>Error: " + e.getMessage() + "</h2>");
            out.println("</body></html>");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            out.println("<html><body>");
            out.println("<h2>Error: " + e.getMessage() + "</h2>");
            out.println("</body></html>");
        } finally {
            // Close resources
            try {
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
